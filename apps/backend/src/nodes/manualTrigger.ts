import { ExecutionContext } from "../services/executionService";

export class ManualTrigger{
    async execute(parameters: Record<string,any>,
        credentials: Record<string,any>,
    ) :Promise<{success:boolean}>{
        console.log("mannual trigger executed")

        return {
            success:true
        }
    }
}