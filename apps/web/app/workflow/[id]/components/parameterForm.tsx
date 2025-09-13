import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Node } from "@xyflow/react";
import { DBNode } from "../../../home/types";

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
        data: { label: selectedNode?.name,parameters: parametersList,credentials: credentialsList,type:selectedNode?.type,code:selectedNode?.code},
        position: { x: 5, y: 5 },
        
      },
    ]);
    setAddingNode(false)
  };

  return (
    <div>
      {selectedNode?.parameters && (
        <div>
          <h1>Parameters</h1>
          {Object.entries(selectedNode.parameters).map(([key, param], idx) => (
            <div key={idx}>
              <h3>{param.label}</h3>
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
          <h1>Credentials</h1>
          {Object.entries(selectedNode.credentials!).map(([key, param], idx) => (
            <div key={idx}>
              <h3>{param.label}</h3>
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
        </div>
      )}
      <button
        onClick={() => {
          handleParameterSubmit();
        }}
      >
        Submit
      </button>
    </div>
  );
}
