import React, { ReactNode, useState } from 'react';
import { AssetInfo, ImageInfo } from "../dataModels/assetInfo";
import LoadingScreen from "./loadingScreen";
import SplashScreen from './splashScreen';
import DFlowBuffer from './renderOutput';
import './container.scss';
import Visible from './visible';

export interface DFlowProps {
  assets: AssetInfo[];
  splash: ImageInfo;
  children: ReactNode;
}

export default function DFlow(props: DFlowProps) {
  const [loading, setLoading] = useState(true);

  function onLoad(priority: number) {
    if (priority === 0) {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <div className="sequencer">
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
}