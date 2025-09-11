import { Router } from "express";
import { Credentials } from "../database/model";

const router:Router = Router()

router.post('/',async(req,res)=>{

    try{

        await  Credentials.create(req.body)
        
        res.json({message:'credentials updated'})
    }catch(e){
        console.log("error updating credentials ",e)
    }
})



export default router