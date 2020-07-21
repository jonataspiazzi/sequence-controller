import React from 'react';

export interface OverlayProps {
  image: string;
  visible: boolean;
}

export default function Overlay(props: OverlayProps) {
  return (
    <div className={`overlay ${props.visible ? 'visible' : ''}`}>
      <img alt="" src={props.image} />
    </div>
  )
}