import React from 'react';

export interface ToolBarProps {
  visible: boolean;
  children: React.ReactNode;
}

export default function ToolBar(props: ToolBarProps) {
  return (
    <ul className="tool-bar" style={{ display: props.visible ? 'flex' : 'none' }}>
      {props.children}
    </ul>
  );
}
