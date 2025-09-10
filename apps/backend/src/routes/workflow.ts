import { Router } from "express";
import { Workflows } from "../database/model";


const router:Router =  Router()

router.post('/',async(req,res)=>{

    try{

        const workflow = await Workflows.create({...req.body,userId:(req as any).userId})
        console.log("workflow created ")
        
        res.json({message:"workflow created"})
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


export default router