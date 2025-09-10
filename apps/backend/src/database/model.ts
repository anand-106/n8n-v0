import mongoose from "mongoose";
import { WorkflowSchema } from "./schema";

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    userId: String,
  });


export const Workflows = mongoose.model('workflows',WorkflowSchema)

 export  const Users =  mongoose.model('users',UserSchema)