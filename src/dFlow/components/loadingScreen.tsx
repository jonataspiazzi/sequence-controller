import React, { useState, useEffect } from 'react';
import { AssetInfo } from "../dataModels/assetInfo";
import AssetsLoader, { ProgressInfo } from "../loaders/assetsLoader";
import { MINIMUM_PROGRESS_VALUE_DISPLAY } from "../helpers/config";

export interface LoadingScreenProps {
  assets: AssetInfo[];
  onLoad: (priority: number) => void;
}

export default function LoadingScreen(props: LoadingScreenProps) {
  const [percentage, setPercentage] = useState(MINIMUM_PROGRESS_VALUE_DISPLAY * 100);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const loader = new AssetsLoader(props.assets);

    if (typeof props.onLoad !== 'function') return;

    const onload = (priority: number) => {
      if (priority === 0) setVisible(false);
      props.onLoad(priority);
    };

    const onprogress = ({ progress }: ProgressInfo) => {
      setPercentage(progress * 100);
    };

    const onerror = () => {
      // TODO: Do something of fail
      console.error('TODO: do something of fail');
    };

    loader.addEventListener('load', onload);
    loader.addEventListener('error', onerror);
    loader.addEventListener('progress', onprogress);
    loader.load();

    return () => {
      loader.removeEventListener('load', onload);
      loader.removeEventListener('error', onerror);
      loader.removeEventListener('progress', onprogress);
    };
  }, [props]);



  return (
    <div className="loading" style={{ display: visible ? 'flex' : 'none' }}>
      <p className="status">Carregando a sua experiência virtual online. <span className="percentage">{percentage.toFixed(2)}</span>%</p>
      <div className="progress">
        <div className="bar" style={{ width: `${Math.round(percentage)}%` }}>
        </div>
      </div>
    </div>
  )
}