
"use client"

import { useParams } from "next/navigation"
import { Graph } from "./components/Graph"

export default function WorkflowPage(){
    const params = useParams()
    const {id} = params
    return <div>
        <Graph workflowId={id!.toString()} />
    </div>
}