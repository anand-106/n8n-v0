import { Queue, Worker, Job } from "bullmq";
import {Redis} from "ioredis";
import { executeFromNode, executeNode } from "./executionService";
import { Iworkflow } from "../database/schema";
import { Workflows } from "../database/model";

const connection = new Redis({
    maxRetriesPerRequest:null
})

export const nodeQueue = new Queue('node-queue',{connection})

export const nodeWorker = new Worker('node-queue',
    async (job:Job) =>{
        const { executionId, workflowId, nodeId } = job.data;

        console.log("executing node: ",nodeId)

        await executeNode(nodeId,workflowId,executionId)

        return {
            success: true,
            nodeId,
            executionId,
            workflowId
        }
    },
    {connection}
    
)

nodeWorker.on("completed", async(job) => {
    const { executionId, workflowId, nodeId } = job.returnvalue;
    console.log(`Job ${job.id} for node ${nodeId} in workflow ${workflowId} completed`);

    const Workflow = await Workflows.findOne({id:workflowId})

    if(!Workflow) return console.log("workflow not found")

    const outgoingEdges = Workflow.connections?.filter(edge=>edge.source.node===nodeId)||[]
    for(const edge of outgoingEdges){
        const nextNode = Workflow.nodes?.find(node=>node.id===edge.destination.node)

        if(nextNode){
          await  executeFromNode(nextNode,Workflow,executionId)
        }
        else{
            console.log("next node not found")
        }
    }

  });
  
  nodeWorker.on("failed", (job, err) => {
    console.error(`Job ${job?.id} failed`, err);
  });