import React, { useEffect, useState, ReactNode, useRef } from 'react';
import { ImageInfo } from '../dataModels/assetInfo';
import { useAssetSource } from './hooks';

export interface HelpScreenProps {
  asset: ImageInfo;
  children: ReactNode;
  onHelped: () => void;
}

export default function HelpScreen(props: HelpScreenProps) {
  const [img] = useAssetSource(props.asset);
  const [visible, setVisible] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    rootRef.current.querySelector('.ok-button').addEventListener('click', e => {
      setVisible(false);

      setTimeout(() => {
        props.onHelped();
      }, 200);
    });
  }, [props]);

  return (
    <div className={`screen help ${visible ? '' : 'hide'}`} ref={rootRef}>
      <img className="background" alt="" src={img} />
      {props.children}
    </div>
  );
}