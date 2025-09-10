
"use client"

import { useParams } from "next/navigation"
import { Graph } from "./components/Graph"

export default function WorkflowPage(){
    const params = useParams()
    const {id} = params
    return <div className="bg-[#414244] w-screen h-screen">
        <Graph workflowId={id!.toString()} />
    </div>
}