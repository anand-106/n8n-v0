import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { createReactAgent, AgentExecutor } from "langchain/agents";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { multiplyTool } from "./tools/MultiplyTool";

export class AgentNode {
  async execute(
    parameters: Record<string, any>,
    credentials: Record<string, any>
  ) {
    const { model } = parameters;
    // const { apiKey } = credentials;

    const apiKey = 'AIzaSyB9vTLgvbJWcOXLbl7UNqCcSx05brtrcjw'

    const llm = new ChatGoogleGenerativeAI({
      model: model?.modelName || "gemini-2.0-flash",
      apiKey: apiKey,
      temperature: 0,
    });

    const tools = [multiplyTool];

    const prompt = ChatPromptTemplate.fromTemplate(
      "You are an agent. Use the tools available to answer the user's query: {input}"
    );

    const agent = await createReactAgent({
        llm,
        tools,
        prompt,
      });

      const agentExecutor = new AgentExecutor({
        agent,
        tools,
      });
      
      const response = await agentExecutor.invoke({
        input: "Multiply 6 and 7 using MultiplyTool"
      });
      
      console.log("Agent response:", response.output);
  }
}

const agent = new AgentNode()

agent.execute({},{})
