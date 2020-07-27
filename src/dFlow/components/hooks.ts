import { useState, useEffect, useCallback, LegacyRef } from 'react';
import { AssetInfo, FrameSequenceInfo } from '../dataModels/assetInfo';
import OrbitYControl from '../controls/orbitYControl';

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

  return source;
}

type Box<T> = { current: T };

export function useOrbitalX<T extends SVGElement>(asset: FrameSequenceInfo, left: string, center: string, right: string): LegacyRef<T> {
  const obj = {} as Box<OrbitYControl<T>>;

  return useCallback((node: T) => {
    if (!node) return;

    obj.current = new OrbitYControl(node, asset, left, center, right);
  }, [asset, left, center, right]);

  //return [callback, obj];
}