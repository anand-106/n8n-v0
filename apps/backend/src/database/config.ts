
import mongoose from 'mongoose'


export async  function connectDB(){
    try{

       

       await mongoose.connect(process.env.DATABASE_URL!)
        console.log("connected to DB")
    }
    catch(e){
        console.error("error connecting db",e)
    }
}