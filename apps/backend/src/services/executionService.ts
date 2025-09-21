import { Iworkflow,Inode } from "../database/schema";
import { v4 as uuidv4 } from "uuid";
import { nodeQueue, nodeWorker } from "./queue";
import { Workflows } from "../database/model";
import { NodeRegistry, ToolRegistry } from "./nodeRegistry";
import { DynamicTool } from "@langchain/core/tools";
import { ToolInput } from "../nodes/types";

export interface ExecutionContext {
    // Execution metadata
    executionId: string;
    workflowId: string;
    userId: string;
    startTime: Date;
    
    // // Data flow
    // globalData: Record<string, any>;  // Shared across all nodes
    // nodeData: Map<string, any>;       // Node-specific outputs
    // variables: Record<string, any>;   // User-defined variables
    
    // Execution state
    // completedNodes: Set<string>;
    // failedNodes: Set<string>;
    
    // // Configuration
    // settings: {
    //   timeout: number;
    //   retryCount: number;
    //   errorHandling: 'stop' | 'continue' | 'retry';
    // };
  }

export async function executeWorkflow(workflow:Iworkflow){

    const nodes = workflow.nodes
    const edges = workflow.connections

    

    const startNode = nodes?.find(node=>node.type=='trigger')

    if (!startNode) {
        console.error("No TRIGGER node found in workflow");
        throw new Error("No TRIGGER node found in workflow");
    }

    const executionId = uuidv4()

    const State :ExecutionContext={
        executionId: executionId,
        workflowId: workflow.id,
        userId: workflow.userId,
        startTime: new Date(),
    }
  await  executeFromNode(startNode!,workflow,executionId)

}

export async function executeFromNode(currentNode:Inode,Workflow:Iworkflow,executionId: string){

   await nodeQueue.add("executeNode",{
    executionId: executionId,
    workflowId: Workflow.id,
    nodeId: currentNode.id,
})

    
   

    

}



export async function executeNode(nodeId:string,workflowId:string,executionId:string){
    console.log("executing node",nodeId)
    const workflow = await Workflows.findOne({id:workflowId})

    const node = workflow?.nodes?.find(nd=>nd.id===nodeId)

    

    if(node?.type=='tool' || node?.type=='model') return console.log(`Reached ${node.name}, and returning`)

      let tools:any[] =[]
      let model:any;

    if(node?.type=='agent'){
      
      const outgoing = workflow?.connections?.filter(edge=>edge.source.node == node.id) ?? []

      const  toolNodes = outgoing?.map(c=>workflow?.nodes?.find(nd=>nd.id==c.destination.node))

      // console.log(tools)

      toolNodes.map(tln=>{
        if(tln?.type=='model'){
          model = tln
        }
        else{

        const  baseTool = ToolRegistry[tln?.code!];

        const wrappedTool = new DynamicTool({
          name:baseTool.name,
          description: tln?.parameters!.description || baseTool.description,
          func: async(input:string)=>{

            const ToolData: ToolInput = {
              workflow: workflowId,
              nodeId: tln?.id!,
              parameters: tln?.parameters!,
              credentials: tln?.credentials!,
              executionId:executionId
            }
            return await baseTool.func({
              AgentData:input,
              ToolData:ToolData
            })
          }
        })

          tools.push(wrappedTool)
        }
      })
    }

   const NodeClass = NodeRegistry[node?.code ?? ""]

   if(!NodeClass){
    console.log("Unknown node type")
   }

   const nodeInstance = new NodeClass();

  //  console.log("the tools are ",tools)

   await nodeInstance.execute(node?.parameters,node?.credentials,tools,model)


}