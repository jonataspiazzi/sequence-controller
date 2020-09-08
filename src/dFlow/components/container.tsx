import React, { ReactNode, useState, forwardRef } from 'react';
import { AssetInfo, ImageInfo } from "../dataModels/assetInfo";
import LoadingScreen from "./loadingScreen";
import SplashScreen from './splashScreen';
import DFlowBuffer from './renderOutput';
import AudioPlayer from './audioPlayer';
import Visible from './visible';
import './container.scss';

export interface DFlowProps {
  assets: AssetInfo[];
  splash: ImageInfo;
  children: ReactNode;
}

const DFlow = forwardRef((props: DFlowProps, ref: any) => {
  const [loading, setLoading] = useState(true);

  function onLoad(priority: number) {
    if (priority === 0) {
      setLoading(false);
    }
  }

  return (
    <div className="container" ref={ref}>
      <div className="sequencer">
        <AudioPlayer />
        <SplashScreen asset={props.splash} />
        <Visible visible={loading}>
          <LoadingScreen assets={props.assets} onLoad={onLoad} />
        </Visible>
        <Visible visible={!loading}>
          <DFlowBuffer />
          {props.children}
        </Visible>
      </div>
    </div>
  );
});

export default DFlow;