"use client";

import { useState, useCallback, useEffect } from "react";
import Image from 'next/image';
import axios from "axios";
import "@xyflow/react/dist/style.css";
import {
  ReactFlow,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  type Node,
  type Edge,
  type OnConnect,
  type OnNodesChange,
  type OnEdgesChange,
  OnNodesDelete,
  OnEdgesDelete,
} from "@xyflow/react";
import { IConnection, INode, Iworkflow } from "../../../home/types";
import { useParams } from "next/navigation";
import { initialNodes, initialEdges, nodeTypes, fitViewOptions, defaultEdgeOptions, onNodeDrag } from "./utils/graphData";
import { TriggersAndNodes } from "./panels/TriggersAndNodes";


export function Graph({ workflowId }: { workflowId: string }) {
  
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const [isSelectingTool,setIsSelectingTool] = useState<boolean>(false)
  const [isSelectingModel,setIsSelectingModel] = useState<boolean>(false)

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
            type: node.type,
            data: {
              label: node.name,
              type: node.type,
              code: node.code,
              parameters: node.parameters,
              credentials: node.credentials,
              onSelectTool: ()=> setIsSelectingTool(true),
              onSelectModel: ()=> setIsSelectingModel(true)
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
            sourceHandle: edge.source.type,
            targetHandle: edge.destination.type
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
    (connection) => setEdges((eds) => {
      if (connection.sourceHandle === "model-output") {
        const alreadyConnected = eds.some(
          (e) => e.source === connection.source && e.sourceHandle === "model-output"
        );

        if (alreadyConnected) {
          return eds; 
        }
      }

      return addEdge(connection, eds);
    }),
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
          type: edge.sourceHandle!
        },
        destination: {
          node: edge.target,
          type: edge.targetHandle!
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
          <TriggersAndNodes setIsSelectingModel={setIsSelectingModel} isSelectingModel={isSelectingModel} setIsSelectingTool={setIsSelectingTool} isSelectingTool={isSelectingTool} setNodes={setNodes} />
        </div>
      </div>
    </div>
  );
}


