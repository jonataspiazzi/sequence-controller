import { useState, useEffect } from 'react';
import { AssetInfo } from '../dataModels/assetInfo';

export function useAssetSource(asset: AssetInfo) {
  const [source, setSource] = useState<string>(null);

  useEffect(() => {
    if (asset.loaded) {
      setSource(asset.source);
      return;
    }

    asset.addEventListenerOnce('load', () => {
      setSource(asset.source);
    });
  }, [asset]);

  return [source];
}