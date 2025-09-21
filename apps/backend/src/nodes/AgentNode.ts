import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import {HumanMessage} from '@langchain/core/messages'
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { multiplyTool } from "./tools/MultiplyTool";
import { AdditionTool } from "./tools/AdditionTool";
import { Inode } from "../database/schema";

export class AgentNode {
  async execute(
    parameters: Record<string, any>,
    credentials: Record<string, any>,
    tools: any[] = [],
    model:any
  ) {
    const { modelName } = model.parameters!;
    const { apiKey } = model.credentials!;
    const {query } = parameters

    const llm = new ChatGoogleGenerativeAI({
      model: modelName || "gemini-2.0-flash",
      apiKey: apiKey,
      temperature: 0,
    });



    const agent = createReactAgent({
        llm,
        tools
      });

      const response = await agent.invoke({
        messages: [new HumanMessage(query)],
      });

      
      
      console.log("Agent response:", response.messages[response.messages.length - 1]!.content);
  }
}

