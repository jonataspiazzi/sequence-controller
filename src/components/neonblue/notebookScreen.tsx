import React, { useState } from 'react';
import { assets } from './assetsConfig';
import { useAssetSource } from '../../dFlow/components/hooks';

export interface NotebookScreenProps {
  onClose: () => void;
}

export default function NotebookScreen(props: NotebookScreenProps) {
  const img = useAssetSource(assets.layerNotebookScreen);
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
      <div className="tranformer">
        {/*<iframe src="https://player.vimeo.com/video/112836958?autoplay=1&title=0&byline=0&portrait=0&controls=0" frameBorder="0" allow="autoplay; fullscreen" allowFullScreen></iframe>*/}
      </div>
      <svg viewBox="0 0 1280 720" className="action-layer">
        <rect x="30" y="647.75" width="103" height="42.25" onClick={onClose} />
      </svg>
    </div>
  );
}