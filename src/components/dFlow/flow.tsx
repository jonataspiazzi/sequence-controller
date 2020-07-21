import React, { useEffect, useState } from 'react';
import { VideoInfo } from './assetInfo';
import Notifier from './notifier';
import { useAssetSource } from './hooks';
import { assets } from '../neonblue/assets/config';

export interface FlowControllerMap {
  videoChanged: (asset: VideoInfo) => void;
  progressChanged: (progress: number) => void;
}

class FlowController extends Notifier<FlowControllerMap> {
  setVideo(asset: VideoInfo) {
    this.dispatchEvent('videoChanged', asset);
  }
  setProgress(progress: number) {
    this.dispatchEvent('progressChanged', progress);
  }
}

export const flowController = new FlowController();

export default function Flow() {
  const [video, setVideo] = useState<string>(null);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    flowController.addEventListener('videoChanged', a => setVideo(a.source));
    flowController.addEventListener('progressChanged', p => setProgress(p));
  });

  return (
    <div className={`screen flow`}>
      <video src={video} />
    </div>
  );
}