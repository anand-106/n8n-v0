import React from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import '../../styles/style.css'
import Image from 'next/image';

const DarkNode: React.FC<NodeProps> = ({ data }) => {
  console.log(data.icon)
  return (
    <div className="darkNode">
      <Handle id='input' type="target" position={Position.Left} style={{ background: '#4cafef' }} 
      isValidConnection={(connection)=>connection.sourceHandle==='output'}
      />
      <Image src={data.icon as string} width={20} height={20} alt={data.code as string} />
      <div>{String(data.label)}</div>
      <Handle id='output' type="source" position={Position.Right} style={{ background: '#4cafef' }}
      isValidConnection={(connection)=>connection.sourceHandle==='input'}
      />
    </div>
  );
};

export default DarkNode;
