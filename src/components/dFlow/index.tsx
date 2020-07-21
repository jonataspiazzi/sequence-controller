import React from 'react';
import { AssetInfo } from "./assetInfo";
import LoadingScreen from "./loadingScreen";
import './index.scss';

export interface DFlowProps {
  assets: AssetInfo[];
}

export default function DFlow(props: DFlowProps) {
  function onLoad(priority: number) {
    console.log('should be called just once', priority);
  }

  return (
    <div className="container">
      <div className="sequencer">
        <div className="splash">
          <img alt="" />
        </div>
        <LoadingScreen assets={props.assets} onLoad={onLoad} />
      </div>
    </div>
  );
}