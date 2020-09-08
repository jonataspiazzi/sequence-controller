import React, { useState, useEffect, useRef } from 'react';
import { assets } from './assetsConfig';
import { useAssetSource } from '../../dFlow/components/hooks';
import Vimeo from '@vimeo/player';

export interface LiveScreenProps {
  onClose: () => void;
}

export default function LiveScreen(props: LiveScreenProps) {
  const img = useAssetSource(assets.liveFinalFrame);
  const [visible, setVisible] = useState(true);
  const div = useRef<HTMLDivElement>(null);
  const [vimeo, setVimeo] = useState<Vimeo>(null);

  useEffect(() => {
    const { width, height } = div.current.getBoundingClientRect();

    const player = new Vimeo(div.current, {
      id: 305723266,
      autoplay: true,
      byline: false,
      controls: true,
      width,
      height
    });

    player.on('loaded', (id: number) => {
      vimeo.play();
    });

    setVimeo(player);

    return () => player.pause();
  }, [div]);

  function onClose() {
    setVisible(false);
    if (vimeo) vimeo.pause();

    if (typeof props.onClose === 'function') {
      setTimeout(() => {
        props.onClose();
      }, 300);
    }
  }

  return (
    <div className={`screen live-screen ${visible ? '' : 'hide'}`}>
      <div className="vimeo-embed" ref={div}>
      </div>
      <img className="background unclicable" alt="" src={img} />
      <div className="button-bar">
        <a href="#" className="button" onClick={onClose}>Voltar</a>

      </div>
    </div>
  );
}
