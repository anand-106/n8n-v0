import { AgentNode } from "../nodes/AgentNode";
import { EmailNode } from "../nodes/EmailNode";
import { ManualTrigger } from "../nodes/manualTrigger";


export const NodeRegistry :Record<string,any> = {
    MANUAL: ManualTrigger,
    EMS: EmailNode,
    AGENT: AgentNode
}