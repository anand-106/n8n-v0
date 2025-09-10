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
    parameters? : Record<string,unknown>;
    credentials? : Record<string,unknown>;
}

export interface Iworkflow extends Document{

    id: string;
    userId:string
    title: string;
    enabled: boolean;
    nodes?: Inode[]
    connections?: IConnection[]
}

export interface DBTrigger extends Document {
    name: string;
    type: string;
    parameters? : Record<string,unknown>;
    credentials? : Record<string,unknown>;
}

export interface DBNode extends Document {
    name: string;
    type: string;
    parameters? : Record<string,unknown>;
    credentials? : Record<string,unknown>;
}