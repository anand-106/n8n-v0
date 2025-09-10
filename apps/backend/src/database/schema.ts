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
    id:{type:String,unique:true,required:true},
    userId:{type:String,required:true},
    title:String,
    enabled:Boolean,
    nodes:[NodeSchema],
    connections:[ConnectionSchema]
})