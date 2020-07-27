import React, { useState } from 'react';
import { assets } from './assetsConfig';
import { useAssetSource } from '../../dFlow/components/hooks';

export interface CameraHelpProps {
  onClose: () => void;
}

export default function CameraHelp(props: CameraHelpProps) {
  const img = useAssetSource(assets.layerCameraHelp);
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
      <svg viewBox="0 0 1280 720" className="action-layer">
        <rect x="30" y="648.17" width="102.67" height="41.83" onClick={onClose} />
      </svg>
    </div>
  );
}