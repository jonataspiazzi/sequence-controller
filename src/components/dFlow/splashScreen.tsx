import React, { useEffect, useState } from 'react';
import { ImageInfo } from './assetInfo';

export interface SplashScreenProps {
  asset: ImageInfo;
}

export default function SplashScreen(props: SplashScreenProps) {
  const [img, setImg] = useState<string>(null);

  useEffect(() => {
    props.asset.addEventListener('load', () => {
      setImg(props.asset.source);
    });
  }, []);

  return (
    <div className="splash">
      <img alt="" src={img} />
    </div>
  );
}