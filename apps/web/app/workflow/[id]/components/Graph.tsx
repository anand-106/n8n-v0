"use client";

import { useState, useCallback, useEffect } from "react";
import {v4 as uuidv4} from 'uuid'
import axios from "axios";
import "@xyflow/react/dist/style.css";
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
} from "@xyflow/react";
import { DBNode, Iworkflow } from "../../../home/types";

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
  console.log("drag event", node.data);
};

export function Graph({ workflowId }: { workflowId: string }) {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  let workflow: Iworkflow;

  const getWorkflow = () => {
    const token = localStorage.getItem("token");

    axios
      .get(`http://localhost:4000/workflow/${workflowId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        workflow = res.data;

        const newNodes: Node[] = [];

        workflow.nodes?.forEach((node) => {
          newNodes.push({
            id: node.id,
            data: {
              label: node.name,
            },
            position: {
              x: node.position[0],
              y: node.position[1],
            },
          });
        });
        setNodes(newNodes);

        const newEdges: Edge[] = [];
        workflow.connections?.forEach((edge, index) => {
          newEdges.push({
            id: `e${edge.source.node}-${edge.destination.node}-${index}`,
            source: edge.source.node,
            target: edge.destination.node,
          });
        });
        setEdges(newEdges);
      })
      .catch(console.error);
  };

  useEffect(() => {
    getWorkflow();
  }, []);

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  return (
    <div className="flex">
      
    <div style={{ width: "70vw", height: "70vh", backgroundColor: "white" }}>
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
    <div>
      <TriggersAndNodes setNodes={setNodes} />
    </div>
    </div>
  );
}

function TriggersAndNodes({setNodes}:{setNodes:React.Dispatch<React.SetStateAction<Node[]>>}) {
const [Nodes,SetNodes] = useState<DBNode[]>([])
const [selectedNodeType,setSelectedNodeType] = useState<string>('trigger')

  const getNodes = () =>{
    axios.get(`http://localhost:4000/workflow/${selectedNodeType}/get`,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    }).then(res=>{
        SetNodes(res.data.nodes)
    })
  }

  useEffect(()=>{
    getNodes()
  },[selectedNodeType])

  return (
    <div className="w-[400px] h-full text-white">
      <div className="flex w-full p-3 items-center">
        <button className={`w-1/2 text-xl font-bold cursor-pointer ${selectedNodeType=='trigger'?' border-b-2 border-[#ef4e39]':''}`}
        onClick={()=>{
          setSelectedNodeType('trigger')
        }}
        >Triggers</button> <button className={`w-1/2 text-xl font-bold cursor-pointer ${selectedNodeType=='node'?' border-b-2 border-[#ef4e39]':''}`}
        onClick={()=>{
          setSelectedNodeType('node')
        }}
        >Nodes</button>
      </div>
      <div className="flex flex-col w-full">
        {
          Nodes.map((node,idx)=>{
            return <div key={idx} className="w-full p-3 cursor-pointer"
            onClick={()=>{
              setNodes((prev)=>([...prev,{ id: `nd_${uuidv4().slice(0,8)}`, data: { label: node.name }, position: { x: 5, y: 5 } }]))
            }}
            >
                <h1>{node.name}</h1>
                <h2>{node.type}</h2>
            </div>
          })
        }
      </div>
    </div>
  );
}
