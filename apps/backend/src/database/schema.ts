import { v4 as uuidv4 } from 'uuid';
import {Document,Schema} from 'mongoose'


export interface IConnection {
    source:{
            node:string;
            type?:string;
            }
    destination:{
                node:string;
                type?:string;
                }
    index?:string;
}

export interface Inode {
    id: string;
    name: string;
    type: string;
    position: [number,number];
    parameters? : Record<string,any>;
    credentials? : Record<string,any>;
}

export interface DBTrigger extends Document {
    name: string;
    type: string;
    parameters? : Record<string,any>;
    credentials? : Record<string,any>;
}

export interface DBNode extends Document {
    name: string;
    type: string;
    parameters? : Record<string,any>;
    credentials? : Record<string,any>;
}

export interface Iworkflow extends Document{

    id: string;
    userId:string
    title: string;
    enabled: boolean;
    nodes?: Inode[]
    connections?: IConnection[]
}

export const ConnectionSchema = new Schema<IConnection>({
    source: {
        node: { type: String, required: true },
        type: { type: String }
    },
    destination: {
        node: { type: String, required: true },
        type: { type: String }
    },
    index: { type: String }
})

export const NodeSchema = new Schema<Inode>({
    id: {type:String,required:true},
    name: String,
    type: String,
    position: {type:[Number],required:true},
    parameters: Schema.Types.Mixed,
    credentials: Schema.Types.Mixed
})

export const WorkflowSchema = new Schema<Iworkflow>({
    id:{type:String,unique:true,required:true,default: () => `wf_${uuidv4().slice(0,8)}`},
    userId:{type:String,required:true},
    title:String,
    enabled:Boolean,
    nodes:[NodeSchema],
    connections:[ConnectionSchema]
})

export const DBTriggerSchema = new Schema<DBTrigger>({
    name:String,
    type:String,
    parameters: Schema.Types.Mixed,
    credentials: Schema.Types.Mixed
})

export const DBNodeSchema = new Schema<DBNode>({
    name:String,
    type:String,
    parameters: Schema.Types.Mixed,
    credentials: Schema.Types.Mixed
})