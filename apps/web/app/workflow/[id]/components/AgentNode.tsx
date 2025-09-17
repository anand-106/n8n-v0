import { NodeProps,Position, Handle } from "@xyflow/react";


export function AgentNode({data}:NodeProps){

    return <div className="bg-slate-800 text-white py-2 px-4 rounded-xl border border-white">

        <Handle type="target" position={Position.Left} style={{ background: '#4cafef' }} />
        
        <h1 className="text-sm font-semibold">
            {String(data.label)}
        </h1>
      
      <Handle type="source" position={Position.Right} style={{ background: '#4cafef' }} />

      <Handle 
      id='model-input'
      type="target"
      position={Position.Bottom}
      style={{left:'25%'}}
      isValidConnection={(connection)=>connection.sourceHandle==='model-output'}
      />

    <Handle 
      id='tool-input'
      type="target"
      position={Position.Bottom}
      style={{left:'75%' ,width:'7px', height:'7px'}}
      isValidConnection={(connection)=>connection.sourceHandle==='tool-output'}
      onClick={()=> {(data as any ).onSelectTool() }}
      />

    </div>
}