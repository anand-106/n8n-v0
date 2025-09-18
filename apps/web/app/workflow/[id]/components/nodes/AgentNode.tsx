import { NodeProps,Position, Handle, useStore } from "@xyflow/react";


export function AgentNode({data,id}:NodeProps){

  const edges = useStore(state=> state.edges)

    return <div className="bg-slate-800 text-white py-2 px-4 rounded-xl border border-white">

        <Handle id='input' type="target" position={Position.Left} style={{ background: '#4cafef' }}
        isValidConnection={(connection)=>connection.sourceHandle==='output'}
        />
        
        <h1 className="text-sm font-semibold">
            {String(data.label)}
        </h1>
      
      <Handle id='output' type="source" position={Position.Right} style={{ background: '#4cafef' }}
      isValidConnection={(connection)=>connection.targetHandle==='input'}
      />

      <Handle 
      id='model-output'
      type="source"
      position={Position.Bottom}
      style={{left:'25%'}}
      isValidConnection={(connection)=>{
        
        const isConnected = edges.some(ed=>ed.source==id && ed.sourceHandle=='model-output')
        
        return !isConnected && connection.targetHandle==='model-input'}}
      onClick={()=> {(data as any ).onSelectModel() }}
      />

    <Handle 
      id='tool-output'
      type="source"
      position={Position.Bottom}
      style={{left:'75%' ,width:'7px', height:'7px'}}
      isValidConnection={(connection)=>connection.targetHandle==='tool-input'}
      onClick={()=> {(data as any ).onSelectTool() }}
      />

    </div>
}