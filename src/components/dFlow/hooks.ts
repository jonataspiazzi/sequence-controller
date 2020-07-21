import React, { useState, useEffect } from 'react';
import { AssetInfo } from './assetInfo';

export function useAssetSource(asset: AssetInfo) {
  const [source, setSource] = useState<string>(null);

  useEffect(() => {
    if (asset.loaded) {
      setSource(asset.source);
      return;
    }

    asset.addEventListener('load', () => {
      setSource(asset.source);
    });
  }, []);

  return [source];
}