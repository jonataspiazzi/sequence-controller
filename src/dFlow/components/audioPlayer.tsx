import React, { useEffect, useRef } from 'react';
import { audioControls } from '../controls/audioControls';

export default function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    audioControls.setPlayer(audioRef.current);
  }, [audioRef]);

  return (
    <audio ref={audioRef} style={{ display: 'none' }} />
  );
}