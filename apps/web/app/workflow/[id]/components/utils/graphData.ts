import { DefaultEdgeOptions, Edge, FitViewOptions, OnNodeDrag, type Node } from "@xyflow/react";
import DarkNode from "../DarkNode";
import { AgentNode } from "../AgentNode";
import { ToolNode } from "../ToolNode";

export const nodeTypes= { node: DarkNode ,trigger:DarkNode,agent: AgentNode,tool:ToolNode};

export const initialNodes: Node[] = [
  //   { id: '1', data: { label: 'Node 1' }, position: { x: 5, y: 5 } },
  //   { id: '2', data: { label: 'Node 2' }, position: { x: 5, y: 100 } },
];

export const initialEdges: Edge[] = [
  // { id: 'e1-2', source: '1', target: '2' }
];

export const fitViewOptions: FitViewOptions = {
  padding: 0.2,
};

export const defaultEdgeOptions: DefaultEdgeOptions = {
  animated: true,
};

export const onNodeDrag: OnNodeDrag = (_, node) => {
  console.log("drag event", node.data);
};