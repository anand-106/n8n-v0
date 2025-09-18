
import { Node } from "@xyflow/react";
import { v4 as uuidv4 } from "uuid";
import { DBNode } from "../../../../home/types";

export function ModelPanel({nodes,setIsSelectingModel,setNodes}:
    {
        nodes:DBNode[],
        setIsSelectingModel: React.Dispatch<React.SetStateAction<boolean>>;
        setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
    }){

        const handleModelAdd =(node:DBNode)=>{
            setNodes((prev) => [
                ...prev,
                {
                  id: `nd_${uuidv4().slice(0, 8)}`,
                  type: node.type,
                  data: { label: node?.name,parameters: {},credentials: {},type:node?.type,code:node?.code},
                  position: { x: 5, y: 5 },
                  
                },
              ]);
        }
    return <div className="p-3 text-white">
        <div className="flex justify-between items-center mb-3">

        <h1 className="text-lg font-bold">Models</h1>
        <button onClick={()=>setIsSelectingModel(false)} className="cursor-pointer bg-[#ef4e39] text-white px-3 py-1  rounded-md font-semibold">Cancel</button>
        </div>
        {
            nodes.map((nd,idx)=>{
                if(nd.type=='model')
                return <div key={idx} className="flex items-center p-3 border-y-[1px] border-white/50 cursor-pointer" 
                onClick={()=>{
                    handleModelAdd(nd)
                }}
                >
                    <h1 className="text-base font-semibold">{nd.name}</h1>
                </div>
            })
        }
    </div>
}