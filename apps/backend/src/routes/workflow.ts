import { Router } from "express";
import { Nodes, Workflows } from "../database/model";
import { executeWorkflow } from "../services/executionService";


const router:Router =  Router()

router.post('/',async(req,res)=>{

    try{

        const workflow = await Workflows.create({...req.body,userId:(req as any).userId})
        console.log("workflow created ")
        
        res.json({message:"workflow created",id:workflow.id})
    }catch(e){
        console.error(e)
        res.status(500).json({message:"error creating workflow"})
    }
})

router.get('/',async (req,res)=>{
    try{

        const workflows = await Workflows.find({userId:(req as any).userId})

        res.json({workflows})
    }catch(e){
        console.log(e)
        res.status(500).json({message:"error getting workflow"})
    }
})

router.get('/:id',async(req,res)=>{
    const {id} = req.params

    try{
        const workflow = await Workflows.findOne({id:id})

        if(!workflow) return res.status(404).json({message:"workflow not found"})

        res.json(workflow)
    }catch(e){
        console.log(e)
        res.status(500).json({message:"error getting workflow"})
    }

})

router.put('/:id',async(req,res)=>{
    const {id} = req.params

    try{
        const workflow = await Workflows.replaceOne({id:id},req.body)

        res.json(workflow)
    }catch(e){
        console.log(e)
        res.status(500).json({message:"error updating workflow"})
    }

})

router.post('/node',async(req,res)=>{
    try{
        await Nodes.create(req.body)
        res.json({message:"node created successfully"})
    }catch(e){
        console.error("error creating node ",e)
    }
})

router.get('/node/get',async (req,res)=>{
    try{

        const nodes = await Nodes.find()

        res.json({nodes})
    }catch(e){
        console.log(e)
        res.status(500).json({message:"error getting nodes"})
    }
})



router.post('/execute',async(req,res)=>{
    const {id} = req.body

    try{
        const workflow = await Workflows.findOne({id:id})

        if(!workflow) return res.status(404).json({message:"workflow not found"})


            await executeWorkflow(workflow)

        res.json({message:"workflow executed"})
    }catch(e){
        console.log(e)
        res.status(500).json({message:"error getting workflow"})
    }
})


export default router