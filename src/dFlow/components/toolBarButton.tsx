import React from 'react';

export interface ToolBarButtonProps {
  src: string;
  onClick: () => void;
}

export default function ToolBarButton(props: ToolBarButtonProps) {
  return (
    <li className="tool-bar-button">
      <img src={props.src} onClick={props.onClick} />
    </li>
  );
}
