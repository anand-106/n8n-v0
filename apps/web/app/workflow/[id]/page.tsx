
"use client"

import { useParams } from "next/navigation"
import { Graph } from "./components/Graph"
import axios from "axios"

export default function WorkflowPage(){
    const params = useParams()
    const {id} = params
    return <div className="bg-[#414244] w-screen h-screen">
        <Graph workflowId={id!.toString()} />
        <Execute/>
    </div>
}

function Execute(){

    const params= useParams()

    const id = params.id

    const handleExecute = ()=>{
        axios.post('http://localhost:4000/workflow/execute',{
            id
        },{
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
            }
        }).then(res=>{
            console.log(res.data)
        }).catch(console.error)
    }

    return<div>
        <button className="cursor-pointer" onClick={handleExecute} >Execute Workflow</button>
    </div>
}