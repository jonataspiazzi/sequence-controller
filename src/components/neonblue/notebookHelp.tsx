import React, { useState } from 'react';
import { assets } from './assetsConfig';
import { useAssetSource } from '../../dFlow/components/hooks';

export interface NotebookHelpProps {
  onClose: () => void;
}

export default function NotebookHelp(props: NotebookHelpProps) {
  const [img] = useAssetSource(assets.layerNotebookHelp);
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
    <div className={`screen notebook-help ${visible ? '' : 'hide'}`}>
      <img className="background" alt="" src={img} />
      <svg viewBox="0 0 1280 720" className="action-layer">
        <rect x="30" y="647.39" width="135.25" height="42.61" onClick={onClose} />
      </svg>
    </div>
  );
}