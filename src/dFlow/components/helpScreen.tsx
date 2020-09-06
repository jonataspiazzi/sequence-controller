import React, { useState, useRef } from 'react';
import { ImageInfo } from '../dataModels/assetInfo';
import { useAssetSource } from './hooks';

export interface HelpScreenProps {
  asset: ImageInfo;
  onHelped: () => void;
}

export default function HelpScreen(props: HelpScreenProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const img = useAssetSource(props.asset);
  const [visible, setVisible] = useState(true);

  function onClose() {
    setVisible(false);

    setTimeout(() => {
      props.onHelped();
    }, 200);
  }

  return (
    <div className={`screen help ${visible ? '' : 'hide'}`} ref={rootRef} onClick={onClose}>
      <img className="background" alt="" src={img} />
    </div>
  );
}