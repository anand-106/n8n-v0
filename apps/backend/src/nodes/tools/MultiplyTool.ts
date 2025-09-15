
import { Tool } from "langchain/tools";

export const multiplyTool = new Tool({
  name: "MultiplyTool",
  description: "Multiplies two numbers, input format: {a: number, b: number}",
  func: async (input: { a: number; b: number }) => {
    return input.a * input.b;
  },
});
