import React, { useEffect, useState } from 'react';
import { ImageInfo } from './assetInfo';
import { useAssetSource } from './hooks';

export interface SplashScreenProps {
  asset: ImageInfo;
}

export default function SplashScreen(props: SplashScreenProps) {
  const [image] = useAssetSource(props.asset);

  return (
    <div className="splash">
      <img alt="" src={image} />
    </div>
  );
}