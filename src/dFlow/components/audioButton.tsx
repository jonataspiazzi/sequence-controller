import React, { useState, useEffect } from 'react';
import { assets } from '../../components/dreamhouse/assetsConfig';
import ToolBarButton from './toolBarButton';
import { useAssetSource } from './hooks';
import { audioControls } from '../controls/audioControls';

export default function AudioButton() {
  const aEnable = useAssetSource(assets.audioOn);
  const aDisable = useAssetSource(assets.audioOff);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);

  useEffect(() => {
    audioControls.addEventListener('volumeEnableChanged', c => setIsAudioEnabled(c.audioEnabled));
  }, []);

  function onClick() {
    audioControls.toggleAudioEnabled();
  }

  return <ToolBarButton src={isAudioEnabled ? aEnable : aDisable} onClick={onClick} />;
}