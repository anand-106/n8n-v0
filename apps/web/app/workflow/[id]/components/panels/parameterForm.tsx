import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Node } from "@xyflow/react";
import { DBNode } from "../../../../home/types";


export default function ParameterForm({
  selectedNode,
  setNodes,
  setAddingNode
}: {
  selectedNode: DBNode | undefined;
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  setAddingNode: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [parametersList, setParametersList] = useState<Record<string, any>>({});
  const [credentialsList, setCredentialsList] =  useState<Record<string, any>>({});

  const handleParameterSubmit = () => {
    setNodes((prev) => [
      ...prev,
      {
        id: `nd_${uuidv4().slice(0, 8)}`,
        type: selectedNode?.type,
        data: { label: selectedNode?.name,parameters: parametersList,credentials: credentialsList,type:selectedNode?.type,code:selectedNode?.code},
        position: { x: 5, y: 5 },
        
      },
    ]);
    setAddingNode(false)
  };

  return (
    <div className="p-3">
      {selectedNode?.parameters && (
        <div >
          <h1 className="text-lg font-bold">Parameters</h1>
          {Object.entries(selectedNode.parameters).map(([key, param], idx) => (
            <div className="flex flex-col p-2" key={idx}>
              <h3 className="text-sm font-bold">{param.label}</h3>
              <input
                placeholder={param.placeholder}
                onChange={(e) => {
                  setParametersList((prev) => ({
                    ...prev,
                    [key]: e.target.value,
                  }));
                }}
              />
            </div>
          ))}
          {selectedNode?.credentials && (
            <>
              <h1 className="text-lg font-bold">Credentials</h1>
              {Object.entries(selectedNode.credentials).map(([key, param], idx) => (
                <div className="flex flex-col p-2" key={idx}>
                  <h3 className="text-sm font-bold">{param.label}</h3>
                  <input
                    placeholder={param.placeholder}
                    onChange={(e) => {
                      setCredentialsList((prev) => ({
                        ...prev,
                        [key]: e.target.value,
                      }));
                    }}
                  />
                </div>
              ))}
            </>
          )}
        </div>
      )}
      <div className="flex justify-center"> 

      <button
        onClick={() => {
          handleParameterSubmit();
        }}
        className="cursor-pointer bg-[#ef4e39] text-white px-3 py-1  rounded-md font-semibold"
        
        >
        Submit
      </button>
        </div>
    </div>
  );
}
