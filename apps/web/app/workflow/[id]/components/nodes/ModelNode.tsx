import { NodeProps,Position, Handle } from "@xyflow/react";


export function ModelNode({data}:NodeProps){

    return <div className="bg-slate-800 text-white py-2 px-4 rounded-xl border border-white">

        
        <h1 className="text-sm font-semibold">
            {String(data.label)}
        </h1>
      
      <Handle id="model-input" type="target" position={Position.Top} style={{ background: '#4cafef' }} 
      isValidConnection={(connection)=>connection.sourceHandle==='model-output'}
      />

    </div>
}