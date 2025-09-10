'use client'

import axios from "axios"
import { useRouter } from "next/navigation"
import {  useState } from "react"

export function CreateWF(){
    const [wfName,setWFname] = useState<string>("")
    const router = useRouter()


    const createWorkflow =()=>{
        axios.post('http://localhost:4000/workflow/',{
            title:wfName,
            enabled:false,
            nodes:[],
            connections:[]
        },{
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
            }
        }).then(res=>{
            console.log(res)
            router.push(`workflow/${res.data.id}`)
        }).catch(console.error)
    }

    return <div className="w-[400px] h-[200px] rounded-lg border border-white/10 flex flex-col justify-center items-center p-6">
        <h1>Enter Workflow Name</h1>
        <input 
        className="w-full"
        value={wfName} onChange={(e)=>{
            setWFname(e.target.value)
        }} />
        <button 
        className="w-full cursor-pointer"
        onClick={()=>{
            createWorkflow()
        }}>Create</button>
    </div>
}