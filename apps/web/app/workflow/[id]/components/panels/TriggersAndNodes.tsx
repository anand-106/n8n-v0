import { useEffect, useState } from "react";
import type { Node as ReactFlowNode } from "@xyflow/react";
import { DBNode } from "../../../../home/types";
import axios from "axios";
import ParameterForm from "./parameterForm";
import { ToolFunction } from "./ToolsPanel";
import { ModelPanel } from "./modelsPanel";

export function TriggersAndNodes({
    setNodes,
    isSelectingTool,
    setIsSelectingTool,
    isSelectingModel,
    setIsSelectingModel
  }: {
    setNodes: React.Dispatch<React.SetStateAction<ReactFlowNode[]>>;
    isSelectingTool:boolean;
    setIsSelectingTool: React.Dispatch<React.SetStateAction<boolean>>;
    isSelectingModel:boolean;
    setIsSelectingModel: React.Dispatch<React.SetStateAction<boolean>>;
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
  
    return isSelectingTool? <ToolFunction nodes={Nodes} setIsSelectingTool={setIsSelectingTool} setNodes={setNodes} setIsSelectingModel={setIsSelectingModel} />:
    isSelectingModel?
    <ModelPanel nodes={Nodes} setIsSelectingModel={setIsSelectingModel}  setNodes={setNodes} setIsSelectingTool={setIsSelectingTool} />
    :(

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
              onSelectTool={() => setIsSelectingTool(true)}
              onSelectModel={() => setIsSelectingModel(true)}
            />
          ) : (
            Nodes.map((node, idx) => {
              if ((node.type == "node" || node.type == 'agent') && selectedNodeType == "node") {
                return (
                  <div
                    key={idx}
                    className="w-full p-3 cursor-pointer"
                    onClick={() => {
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