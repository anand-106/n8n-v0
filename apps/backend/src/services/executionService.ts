import { Iworkflow,Inode } from "../database/schema";
import { v4 as uuidv4 } from "uuid";

interface ExecutionContext {
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
    completedNodes: Set<string>;
    failedNodes: Set<string>;
    
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

    

    const startNode = nodes?.find(node=>node.type=='TRIGGER')

    if (!startNode) {
        console.error("No TRIGGER node found in workflow");
        throw new Error("No TRIGGER node found in workflow");
    }

    const State :ExecutionContext={
        executionId: uuidv4(),
        workflowId: workflow.id,
        userId: workflow.userId,
        startTime: new Date(),

        completedNodes:new Set(),
        failedNodes:new Set(),
    }
  await  executeFromNode(startNode!,workflow,State)

}

export async function executeFromNode(currentNode:Inode,Workflow:Iworkflow,state:ExecutionContext){

   await executeNode(currentNode.id)

    const outgoingEdges = Workflow.connections?.filter(edge=>edge.source.node===currentNode.id)||[]
    for(const edge of outgoingEdges){
        const nextNode = Workflow.nodes?.find(node=>node.id===edge.destination.node)

        if(nextNode){
          await  executeFromNode(nextNode,Workflow,state)
        }
        else{
            console.log("next node not found")
        }
    }

}


export async function executeNode(nodeId:string){
    console.log("executing node",nodeId)
}