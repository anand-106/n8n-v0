import React from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import '../styles/style.css'

const DarkNode: React.FC<NodeProps> = ({ data }) => {
  return (
    <div className="darkNode">
      <Handle type="target" position={Position.Left} style={{ background: '#4cafef' }} />
      <div>{String(data.label)}</div>
      <Handle type="source" position={Position.Right} style={{ background: '#4cafef' }} />
    </div>
  );
};

export default DarkNode;
