"use client"

import axios from "axios"
import { Iworkflow } from "../types"
import {useEffect, useState} from 'react'
import { useRouter } from "next/navigation"

export default function Workflows(){

    const [workflows,setWorkflows] = useState<Iworkflow[]>([])

    const getWorkflows = ()=>{
        axios.get('http://localhost:4000/workflow/',{
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
            }
        }).then(res=>{
            setWorkflows(res.data.workflows)
        }).catch(console.error)
    }

    useEffect(()=>{
        getWorkflows()
    },[])

    const router = useRouter()

    return <div className="bg-[#2d2f2e] h-full w-full">
        <div className="h-[100px] flex items-center justify-between p-10">
            <button className="text-[#d67062] border-[#d67062] border-b-2 cursor-pointer">Workflows</button> <button className="w-30 h-8 text-sm rounded-md bg-[#d67062] text-white cursor-pointer" >Create Workflow</button>
        </div>
        <div className="">
            {
                workflows.map(wf=>{
                    return <div key={wf.id} className="m-3 cursor-pointer bg-[#414244] h-18 border border-white/10 rounded-lg p-4 flex items-center"
                    onClick={()=>{
                        router.push(`workflow/${wf.id}`)
                    }}
                    >
                        <h1 className="text-white">{wf.title}</h1>
                    </div>
                })
            }
        </div>

    </div>
}


