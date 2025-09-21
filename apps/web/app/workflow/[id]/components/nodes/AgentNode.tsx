import { NodeProps,Position, Handle, useStore } from "@xyflow/react";
import Image from "next/image";


export function AgentNode({data,id}:NodeProps){

  const edges = useStore(state=> state.edges)

    return <div className="bg-[#414344] text-white py-2 px-4 rounded-2xl border-2 border-white">

        <Handle id='input' type="target" position={Position.Left} style={{ background: '#ffffff', width: '8px' ,height: '8px'  }}
        isValidConnection={(connection)=>connection.sourceHandle==='output'}
        />
        <div className="flex gap-2 py-2" >
        <Image src={data.icon as string} width={25} height={25} alt={data.code as string} />
          
        <h1 className="text-lg font-semibold">
            {String('AI  '+data.label)}
        </h1>
        </div>
      
      <Handle id='output' type="source" position={Position.Right} style={{ background: '#ffffff', width: '8px' ,height: '8px'   }}
      isValidConnection={(connection)=>connection.targetHandle==='input'}
      />
      


      <Handle 
      id='model-output'
      type="source"
      position={Position.Bottom}
      style={{left:'25%', background: '#ffffff', width: '8px' ,height: '8px'  }}
      isValidConnection={(connection)=>{
        
        const isConnected = edges.some(ed=>ed.source==id && ed.sourceHandle=='model-output')
        
        return !isConnected && connection.targetHandle==='model-input'}}
      onClick={()=> {(data as any ).onSelectModel?.() }}
      />

    <Handle 
      id='tool-output'
      type="source"
      position={Position.Bottom}
      style={{left:'75%' ,background: '#ffffff', width: '8px' ,height: '8px'  }}
      isValidConnection={(connection)=>connection.targetHandle==='tool-input'}
      onClick={()=> {(data as any ).onSelectTool?.() }}
      />

    </div>
}