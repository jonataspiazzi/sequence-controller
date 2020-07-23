import React, { useState, useEffect } from 'react';
import { AssetInfo } from "./assetInfo";
import AssetsLoader from "./assetsLoader";
import { MINIMUM_PROGRESS_VALUE_DISPLAY } from "./config";

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

    loader.addEventListener('load', priority => {
      if (priority === 0) setVisible(false);
      props.onLoad(priority);
    });

    loader.addEventListener('error', e => {
      // TODO: Do something of fail
    });

    loader.addEventListener('progress', ({ progress }) => {
      setPercentage(progress * 100);
    });

    loader.load();
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