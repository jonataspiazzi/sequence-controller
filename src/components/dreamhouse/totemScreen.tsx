import React, { useState } from 'react';
import { assets } from './assetsConfig';
import { useAssetSource } from '../../dFlow/components/hooks';
import SlideShow from './slideShow';

export interface TotemScreenProps {
  onClose: () => void;
}

export default function TotemScreen(props: TotemScreenProps) {
  const light = useAssetSource(assets.light);
  const [visible, setVisible] = useState(true);
  const [slideIndex, setSlideIndex] = useState(0);
  const [autoChange, setAutoChange] = useState(true);

  if (autoChange) {
    setTimeout(() => {
      if (slideIndex >= 5) {
        setSlideIndex(0);
        return;
      }

      setSlideIndex(slideIndex + 1);
    }, 4000);
  }

  function onClose() {
    setVisible(false);

    if (typeof props.onClose === 'function') {
      setTimeout(() => {
        props.onClose();
      }, 300);
    }
  }

  function onSlideChange(newSlide: number) {
    setAutoChange(false);
    setSlideIndex(newSlide);
  }

  return (
    <div className={`screen totem-screen ${visible ? '' : 'hide'}`}>
      <SlideShow slide={slideIndex} className="layer-2" onChange={onSlideChange} onClose={onClose} />
      <img className="background layer-3 unclicable" alt="" src={light} style={{ opacity: .4 }} />
    </div>
  );
}