import React, { useEffect, useState, ReactNode, useRef } from 'react';
import { ImageInfo } from './assetInfo';

export interface HelpScreenProps {
  asset: ImageInfo;
  children: ReactNode;
  onHelped: () => void;
}

export default function HelpScreen(props: HelpScreenProps) {
  const [img, setImg] = useState<string>(null);
  const [visible, setVisible] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    props.asset.addEventListener('load', () => {
      setImg(props.asset.source);
    });

    rootRef.current.querySelector('.ok-button').addEventListener('click', e => {
      setVisible(false);

      setTimeout(() => {
        props.onHelped();
      }, 200);
    });
  }, []);

  return (
    <div className={`help ${visible ? '' : 'hide'}`} ref={rootRef}>
      <img alt="" src={img} />
      {props.children}
    </div>
  );
}