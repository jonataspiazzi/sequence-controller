import React, { useState } from 'react';
import { assets } from './assets/config';
import { useAssetSource } from '../dFlow/hooks';

export interface CameraHelpProps {
  onClose: () => void;
}

export default function CameraHelp(props: CameraHelpProps) {
  const [img] = useAssetSource(assets.layerCameraHelp);
  const [visible, setVisible] = useState(true);

  function onClose() {
    setVisible(false);

    if (typeof props.onClose === 'function') {
      setTimeout(() => {
        props.onClose();
      }, 300);
    }
  }

  return (
    <div className={`screen camera-help ${visible ? '' : 'hide'}`}>
      <img className="background" alt="" src={img} />
      <svg width="1280" height="720" viewBox="0 0 1280 720" >
        <rect x="22.67" y="648.83" width="197" height="51.5" onClick={onClose} />
      </svg>
    </div>
  );
}