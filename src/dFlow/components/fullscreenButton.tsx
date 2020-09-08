import React, { useState, MutableRefObject, useEffect } from 'react';
import { assets } from '../../components/dreamhouse/assetsConfig';
import ToolBarButton from './toolBarButton';
import { useAssetSource, useWindowSize } from './hooks';
import { exit } from 'process';

export interface FullscreenButtonProps {
  container: MutableRefObject<HTMLDivElement>;
}

const ASPECT_RATIO_WIDE = 16 / 9;

export default function FullscreenButtom(props: FullscreenButtonProps) {
  const fsEnable = useAssetSource(assets.fullscreenEnable);
  const fsDisable = useAssetSource(assets.fullscreenDisable);
  const [isFs, setIsFs] = useState(false);
  const [container, setContainer] = useState<HTMLDivElement>(null);
  const [sequencer, setSequencer] = useState<HTMLDivElement>(null);
  const windowSize = useWindowSize();

  function resizeToFullscreen() {
    const screenRatio = window.innerWidth / window.innerHeight

    let width = 0, height = 0;

    if (screenRatio > ASPECT_RATIO_WIDE) {
      width = Math.floor(window.innerHeight * ASPECT_RATIO_WIDE);
      height = window.innerHeight;
    }
    else {
      width = window.innerWidth;
      height = Math.floor(window.innerWidth / ASPECT_RATIO_WIDE);
    }

    sequencer.style.width = `${width}px`;
    sequencer.style.height = `${height}px`;
  }

  function resizeToNormal() {
    sequencer.style.width = '80vw';
    sequencer.style.height = '45vw';
  }

  async function enterFullscreen() {
    await container.requestFullscreen({ navigationUI: 'show' });
    resizeToFullscreen();
    setIsFs(true);
  }

  async function exitFullscreen() {
    await document.exitFullscreen();
    resizeToNormal();
    setIsFs(false);
  }

  useEffect(() => {
    if (isFs) resizeToFullscreen();
  }, [windowSize]);

  useEffect(() => {
    setContainer(props.container.current);
    setSequencer(props.container.current.querySelector('.sequencer') as HTMLDivElement);
  }, [props.container]);

  async function onClick() {
    if (props.container.current) {
      (document.fullscreen ? exitFullscreen : enterFullscreen)();
    }
  }

  return <ToolBarButton src={isFs ? fsEnable : fsDisable} onClick={onClick} />;
}