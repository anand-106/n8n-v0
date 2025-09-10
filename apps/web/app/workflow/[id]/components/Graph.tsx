"use client"

import { useState, useCallback, useEffect } from 'react';
import axios from 'axios'
import '@xyflow/react/dist/style.css';
import {
  ReactFlow,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  type Node,
  type Edge,
  type FitViewOptions,
  type OnConnect,
  type OnNodesChange,
  type OnEdgesChange,
  type OnNodeDrag,
  type DefaultEdgeOptions,
} from '@xyflow/react';
import { Iworkflow } from '../../../home/types';
 
const initialNodes: Node[] = [
//   { id: '1', data: { label: 'Node 1' }, position: { x: 5, y: 5 } },
//   { id: '2', data: { label: 'Node 2' }, position: { x: 5, y: 100 } },
];
 
const initialEdges: Edge[] = [
    // { id: 'e1-2', source: '1', target: '2' }
];
 
const fitViewOptions: FitViewOptions = {
  padding: 0.2,
};
 
const defaultEdgeOptions: DefaultEdgeOptions = {
  animated: true,
};
 
const onNodeDrag: OnNodeDrag = (_, node) => {
  console.log('drag event', node.data);
};
 
export function Graph({workflowId}:{workflowId:string}) {


  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);


    let workflow :Iworkflow;



  const getWorkflow =()=>{

    const token = localStorage.getItem('token')

    axios.get(`http://localhost:4000/workflow/${workflowId}`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    }).then(res=>{
        workflow = res.data

        const newNodes: Node[] = [];

        workflow.nodes?.forEach(node=>{
            newNodes.push({
                id: node.id,
                data:{
                    label:node.name
                },
                position:{
                    x:node.position[0],
                    y:node.position[1]
                }
            })
        })
        setNodes(newNodes)

        const newEdges: Edge[]=[];
        workflow.connections?.forEach((edge,index)=>{

            newEdges.push({
                id:`e${edge.source.node}-${edge.destination.node}-${index}`,
                source: edge.source.node,
                target: edge.destination.node
            })
        }) 
        setEdges(newEdges)
    }).catch(console.error)
  }




  useEffect(()=>{
    getWorkflow()
  },[])

  

 
  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes],
  );
  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges],
  );
  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges],
  );
 
  return (
    <div style={{ width: '70vw', height: '70vh' ,backgroundColor:'white'}}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeDrag={onNodeDrag}
        fitView
        fitViewOptions={fitViewOptions}
        defaultEdgeOptions={defaultEdgeOptions}
      />
    </div>
  );
}