import { AgentNode } from "../nodes/AgentNode";
import { EmailNode } from "../nodes/EmailNode";
import { ManualTrigger } from "../nodes/manualTrigger";
import { AdditionTool } from "../nodes/tools/AdditionTool";
import { multiplyTool } from "../nodes/tools/MultiplyTool";


export const NodeRegistry :Record<string,any> = {
    MANUAL: ManualTrigger,
    EMS: EmailNode,
    AGENT: AgentNode
}

export const ToolRegistry :Record<string,any> ={
    ADDITION: AdditionTool,
    MULTIPLY: multiplyTool
}