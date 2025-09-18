import React from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import '../../styles/style.css'

const DarkNode: React.FC<NodeProps> = ({ data }) => {
  return (
    <div className="darkNode">
      <Handle id='input' type="target" position={Position.Left} style={{ background: '#4cafef' }} 
      isValidConnection={(connection)=>connection.sourceHandle==='output'}
      />
      <div>{String(data.label)}</div>
      <Handle id='output' type="source" position={Position.Right} style={{ background: '#4cafef' }}
      isValidConnection={(connection)=>connection.sourceHandle==='input'}
      />
    </div>
  );
};

export default DarkNode;
