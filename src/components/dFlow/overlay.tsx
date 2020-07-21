import React from 'react';
import { useAssetSource } from './hooks';
import { AssetInfo } from './assetInfo';

export interface OverlayProps {
  asset: AssetInfo;
  visible: boolean;
}

export default function Overlay(props: OverlayProps) {
  const [image] = useAssetSource(props.asset);

  return (
    <div className={`overlay ${props.visible ? 'show' : ''}`}>
      <img alt="" src={image} />
    </div>
  )
}