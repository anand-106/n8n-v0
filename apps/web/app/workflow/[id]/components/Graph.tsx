"use client";

import { useState, useCallback, useEffect } from "react";
import Image from 'next/image';
import { v4 as uuidv4 } from "uuid";
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
  OnNodesDelete,
  OnEdgesDelete,
} from "@xyflow/react";
import { DBNode, IConnection, INode, Iworkflow } from "../../../home/types";
import { useParams } from "next/navigation";
import ParameterForm from "./parameterForm";
import DarkNode from "./DarkNode";

const nodeTypes = { dark: DarkNode };

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
  const params = useParams();

  const [workflow, setWorkflow] = useState<Iworkflow>();

  const getWorkflow = () => {
    const token = localStorage.getItem("token");

    axios
      .get(`http://localhost:4000/workflow/${workflowId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setWorkflow(res.data);

        const newNodes: Node[] = [];

        res.data.nodes?.forEach((node: INode) => {
          newNodes.push({
            id: node.id,
            type: "dark",
            data: {
              label: node.name,
              type: node.type,
              code: node.code,
              parameters: node.parameters,
              credentials: node.credentials
            },
            position: {
              x: node.position[0],
              y: node.position[1],
            },
          });
        });
        setNodes(newNodes);

        const newEdges: Edge[] = [];
        res.data.connections?.forEach((edge: IConnection, index: number) => {
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

  const onNodesDelete: OnNodesDelete = useCallback((deletedNodes) => {
    console.log("Nodes deleted:", deletedNodes);
  }, []);

  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  const onEdgesDelete: OnEdgesDelete = useCallback((deletedNodes) => {
    console.log("Edges deleted:", deletedNodes);
  }, []);

  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  const SaveWf = () => {
    if (!workflow) return console.log("workflow undefined");
    const saveNodes: INode[] = [];
    const saveEdges: IConnection[] = [];

    nodes.forEach((node) => {
      saveNodes.push({
        id: node.id,
        name: node.data.label as string,
        type: node.data.type as string,
        code: node.data.code as string,
        position: [node.position.x, node.position.y],
        parameters: node.data.parameters as Record<string, unknown> | undefined,
        credentials: node.data.credentials as
          | Record<string, unknown>
          | undefined,
      });
    });

    edges.forEach((edge) => {
      saveEdges.push({
        source: {
          node: edge.source,
        },
        destination: {
          node: edge.target,
        },
      });
    });

    console.log("the param id is ", params.id);

    axios
      .put(
        `http://localhost:4000/workflow/${params.id}`,
        {
          id: workflow.id,
          userId: workflow.userId,
          title: workflow.title,
          enabled: workflow.enabled,
          nodes: saveNodes,
          connections: saveEdges,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log("Workflow updated", res);
      })
      .catch(console.error);
  };

  return (
    <div className="flex flex-col">
      <div className="w-full h-14 flex justify-between items-center pr-20 pl-5">
      <Image src='/image.png' alt="logo" width={100} height={100} />
        {" "}
        <button
          className="cursor-pointer bg-[#ef4e39] text-white px-3 py-1  rounded-md font-semibold"
          onClick={() => {
            SaveWf();

          }}
        >
          Save
        </button>
      </div>
      <div className="flex">
       
        <div
          style={{ width: "70vw", height: "85vh", backgroundColor: "#2d2f2e" }}
          className="rounded-t-lg ml-4"
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            onNodesDelete={onNodesDelete}
            onEdgesChange={onEdgesChange}
            onEdgesDelete={onEdgesDelete}
            onConnect={onConnect}
            onNodeDrag={onNodeDrag}
            fitView
            fitViewOptions={fitViewOptions}
            defaultEdgeOptions={defaultEdgeOptions}
          />
        </div>
        <div className="flex-1">
          <TriggersAndNodes setNodes={setNodes} />
        </div>
      </div>
    </div>
  );
}

function TriggersAndNodes({
  setNodes,
}: {
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
}) {
  const [Nodes, SetNodes] = useState<DBNode[]>([]);
  const [selectedNodeType, setSelectedNodeType] = useState<string>("trigger");
  const [addingNode, setAddingNode] = useState<boolean>(false);
  const [selectedNode, setSelectedNode] = useState<DBNode>();

  const getNodes = () => {
    axios
      .get(`http://localhost:4000/workflow/node/get`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        SetNodes(res.data.nodes);
      });
  };

  useEffect(() => {
    getNodes();
  }, [selectedNodeType]);

  return (
    <div className="w-full h-full text-white">
      <div className="flex w-full p-3 items-center">
        <button
          className={`w-1/2 text-xl font-bold cursor-pointer ${selectedNodeType == "trigger" ? " border-b-2 border-[#ef4e39]" : ""}`}
          onClick={() => {
            setSelectedNodeType("trigger");
          }}
        >
          Triggers
        </button>{" "}
        <button
          className={`w-1/2 text-xl font-bold cursor-pointer ${selectedNodeType == "node" ? " border-b-2 border-[#ef4e39]" : ""}`}
          onClick={() => {
            setSelectedNodeType("node");
          }}
        >
          Nodes
        </button>
      </div>
      <div className="flex flex-col w-full">
        {addingNode ? (
          <ParameterForm
            setAddingNode={setAddingNode}
            setNodes={setNodes}
            selectedNode={selectedNode}
          />
        ) : (
          Nodes.map((node, idx) => {
            if (node.type == "node" && selectedNodeType == "node") {
              return (
                <div
                  key={idx}
                  className="w-full p-3 cursor-pointer"
                  onClick={() => {
                    //setNodes((prev)=>([...prev,{ id: `nd_${uuidv4().slice(0,8)}`, data: { label: node.name }, position: { x: 5, y: 5 } }]))
                    setSelectedNode(node);
                    setAddingNode(true);
                  }}
                >
                  <h1>{node.name}</h1>
                  <h2>{node.code}</h2>
                </div>
              );
            }
            if (node.type == "trigger" && selectedNodeType == "trigger") {
              return (
                <div
                  key={idx}
                  className="w-full p-3 cursor-pointer"
                  onClick={() => {
                    //setNodes((prev)=>([...prev,{ id: `nd_${uuidv4().slice(0,8)}`, data: { label: node.name }, position: { x: 5, y: 5 } }]))
                    setSelectedNode(node);
                    setAddingNode(true);
                  }}
                >
                  <h1>{node.name}</h1>
                  <h2>{node.code}</h2>
                </div>
              );
            }
          })
        )}
      </div>
    </div>
  );
}
