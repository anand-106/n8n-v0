import { NodeProps,Position, Handle } from "@xyflow/react";
import Image from "next/image";


export function ToolNode({data}:NodeProps){

    return <div className="bg-[#414344] text-white py-2 px-4 rounded-full border-2 border-white flex flex-col justify-center items-center">


        <Image src={data.icon as string} width={20} height={20} alt={data.code as string} />
        <h1 className="text-sm font-semibold">
            {String(data.label)}
        </h1>
      
      <Handle id="tool-input" type="target" position={Position.Top} style={{ background: '#ffffff', width: '8px' ,height: '8px'  }} 
      isValidConnection={(connection)=>connection.sourceHandle==='tool-output'}
      />

    </div>
}