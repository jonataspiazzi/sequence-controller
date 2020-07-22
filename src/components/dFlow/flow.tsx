import React, { useEffect, useState, useRef } from 'react';
import { VideoInfo } from './assetInfo';
import Notifier from './notifier';
import { useAssetSource } from './hooks';
import { assets } from '../neonblue/assets/config';
import { resolve } from 'dns';

export interface FlowControllerMap {
  videoChanged: (asset: VideoInfo) => void;
  progressChanged: (progress: number) => void;
  play: () => void;
  pause: () => void;
  ended: () => void;
}

class FlowController extends Notifier<FlowControllerMap> {
  setVideo(asset: VideoInfo) {
    this.dispatchEvent('videoChanged', asset);
  }

  setProgress(progress: number) {
    this.dispatchEvent('progressChanged', progress);
  }

  play() {
    this.dispatchEvent('play');
  }

  pause() {
    this.dispatchEvent('pause');
  }

  ended() {
    this.dispatchEvent('ended');
  }
}

export const flowController = new FlowController();

type BufferId = 0 | 1;

export default function Flow() {
  const [displayBuffer, setDisplayBuffer] = useState<BufferId>(1);
  const [activeBufferId, setActiveBufferId] = useState<BufferId>(1);
  const [activeReady, setActiveReady] = useState(false);
  const buff0Ref = useRef<HTMLVideoElement>(null);
  const buff1Ref = useRef<HTMLVideoElement>(null);
  const [assetBuf0, setAssetBuf0] = useState<string>(null);
  const [assetBuf1, setAssetBuf1] = useState<string>(null);

  useEffect(() => {
    flowController.addEventListener('videoChanged', videoChanged);
    flowController.addEventListener('play', play);
    flowController.addEventListener('pause', pause);

    [buff0Ref, buff1Ref].forEach((buffer, i) => {
      buffer.current.addEventListener('ended', () => ended(i as BufferId));
    });
  }, []);

  function videoChanged(asset: VideoInfo) {
    const newBuffer = activeBufferId === 0 ? 1 : 0;
    console.log('new buffer setted ', newBuffer);

    (newBuffer === 1 ? setAssetBuf0 : setAssetBuf1)(asset.source);
    setActiveBufferId(newBuffer);
    setActiveReady(false);

    getActiveBuffer(newBuffer).addEventListener('canplay', () => {
      setActiveReady(true);
      setDisplayBuffer(newBuffer);
    }, { once: true });
  }

  function getActiveBuffer(id = activeBufferId) {
    console.log('getting buffer ', id);
    return id === 1 ? buff1Ref.current : buff0Ref.current;
  }

  async function waitReady() {
    if (activeReady) return true;

    await new Promise(resolve => {
      getActiveBuffer().addEventListener('canplay', () => resolve(true), { once: true });
    });
  }

  async function play() {
    console.log('play called');

    await waitReady();

    getActiveBuffer().play();
  }

  async function pause() {
    console.log('pause called');

    await waitReady();

    getActiveBuffer().pause();
  }

  function ended(id: BufferId) {
    flowController.ended();
  }

  return (
    <div className={`screen flow`}>
      <video src={assetBuf0} ref={buff0Ref} className="full-child buffer-0" style={{ zIndex: displayBuffer === 0 ? 2 : 1 }} />
      <video src={assetBuf1} ref={buff1Ref} className="full-child buffer-1" style={{ zIndex: displayBuffer === 1 ? 2 : 1 }} />
    </div>
  );
}