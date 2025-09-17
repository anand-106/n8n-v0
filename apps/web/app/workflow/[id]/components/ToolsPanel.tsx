import { DBNode } from "../../../home/types";

export function ToolFunction({nodes,setIsSelectingTool}:{nodes:DBNode[],setIsSelectingTool: React.Dispatch<React.SetStateAction<boolean>>}){
    return <div className="p-3 text-white">
        <div className="flex justify-between items-center mb-3">

        <h1 className="text-lg font-bold">Tools</h1>
        <button onClick={()=>setIsSelectingTool(false)} className="cursor-pointer bg-[#ef4e39] text-white px-3 py-1  rounded-md font-semibold">Cancel</button>
        </div>
        {
            nodes.map(nd=>{
                if(nd.type=='tool')
                return <div className="flex items-center p-3 border-y-[1px] border-white/50 cursor-pointer">
                    <h1 className="text-base font-semibold">{nd.name}</h1>
                </div>
            })
        }
    </div>
}