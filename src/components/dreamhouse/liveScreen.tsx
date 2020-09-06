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
      id: 454863322,
      autoplay: true,
      byline: false,
      controls: false,
      width,
      height
    });

    player.on('loaded', (id: number) => {
      console.log('callback');
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
      <img className="background" alt="" src={img} />
      <a href="#" className="close-buttom" onClick={onClose}>Voltar</a>
    </div>
  );
}
