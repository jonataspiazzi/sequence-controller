import React, { useState, useEffect } from 'react';
import { assets } from './assetsConfig';
import { useAssetSource, useOrbitalX } from '../../dFlow/components/hooks';
import Overlay from '../../dFlow/components/overlay';
import { bufferControl } from '../../dFlow/controls/bufferControl';

export type ScreenName = 'live' | 'promoter' | 'totem';

export interface InitialScreenProps {
  goTo: (screen: ScreenName) => void;
}

export default function InitialScreen(props: InitialScreenProps) {
  const orbitalRef = useOrbitalX<SVGRectElement>(assets.a360, 'cursor-left', 'cursor-center', 'cursor-right');

  const [highlightLive, setHighlightLive] = useState(false);
  const [highlightPromoter, setHighlightPromoter] = useState(false);
  const [highlightTotem, setHighlightTotem] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    (async () => {
      await bufferControl.setVideo(assets.a360);
      await bufferControl.setFrame(.5);
    })();
  }, []);

  function mouseOn(totem: ScreenName, on: boolean) {
    switch (totem) {
      case 'live': setHighlightLive(on); break;
      case 'promoter': setHighlightPromoter(on); break;
      case 'totem': setHighlightTotem(on); break;
    }
  }

  function goTo(totem: ScreenName) {
    setVisible(false);
    setTimeout(() => {
      props.goTo(totem);
    }, 300);
  }

  return (
    <div className={`screen initial-screen ${visible ? '' : 'hide'}`}>
      <Overlay asset={assets.overLive} visible={highlightLive} />
      <Overlay asset={assets.overReception} visible={highlightPromoter} />
      <Overlay asset={assets.overTotem} visible={highlightTotem} />
      <svg viewBox="0 0 1280 720" className="action-layer">
        <rect width="1280" height="300" ref={orbitalRef} />
        <path d="M51.68,489.33H67v1.33c-3.46,4.68-3.85,12.19-6,18-4.47,12.05-8.86,25.45-13.34,37.33-1,2.72-5,16.1-4.67,16.67,4.35,3.35,12.26,2.85,18,4.67,4.51,1.43,10.61,3.53,15.34,4.67,6.52,1.57,15.44-1.45,20.67-2.67L137,564c.3-26.86-4.83-54.77-8-79.33l27.34-3.33Q149,413,141.7,344.67L37,344v1.33c1,1.61.13,4.25.67,6.67,2.29,10.27.9,21.69,3.33,32.67,3.23,14.59,1.28,30.72,4.67,46,1.83,8.27.67,17.64,2.67,26.67A164.39,164.39,0,0,1,51.68,489.33Z" onMouseEnter={() => mouseOn('live', true)} onMouseLeave={() => mouseOn('live', false)} onClick={() => goTo('live')} />
        <path d="M753.86,502.67c-.23-17.91,1.39-37.67-1.33-52.67H745V438h-3.81a43.16,43.16,0,0,1,1.33-10.67,7,7,0,0,0-4-1.17c0-6.69,3.2-7.17,4.67-13.17h-2c-.21,3-1.19,2.48-2.19,3.67V419h-2v-2.33c0-1.38-.22-1.68-3.24-2,.23,3.08,1.16,3.42,3,4.67-1,2.07-1.14,4-3.81,4.67-.61-.72.15-.05-.57-.67,0-1.81.09-3.07-.55-4a5.59,5.59,0,0,1-1.88,2V420c0-.86-.67-1.65-.74-3.33-2.17.55-1.06-.33-2,1.33,4.33,4.26.93,14,.63,20H724v12.67c-20,0-37.25-1.3-58.09-1.33.07-8.61,1.1-19.18-.37-26.67-9.09-3.48-10.43.37-9.85-13.33-3.37-5.15-1.52-11.8-7.93-14-.79-.53-1.08-.51-2.63-.67.47-15.09-.44-30.15-15.32-30-4.59,3.8-8.3,5.88-10,12.67q.33,7.33.67,14.67c-.73,2.34-2.39,1.91-4,3.33-1.87,1.65-2.32,4.77-4,6.67-3,3.37-7.32,7.11-9.34,11.33-4.39,9.2,6.95,26.46,7.34,36.67-12.83,0-23.63,0-34,0-4.21,0-7.4-1-10.74-.67-10.11,1.15-38.75,5-50.75,1.33v96c4,3.14,1.47,20.41,1.4,25.67A79.59,79.59,0,0,1,533.14,574h80c17.36,0,39.69-2.28,54.68,1.33,7.59,1.83,31.52-1.33,37.34-1.33h49.35C754.6,549,754.14,525,753.86,502.67Zm-136.7-62c-.71.5-.63.4-2,.67-2.18-6.71-5.35-15.27-6-23.33,2-1.55,3.39-4.45,4.67-6.67l2,.67c.66,10.89,3.9,14.39,4,26.67C618.61,439.53,618.69,440,617.16,440.67Z" onMouseEnter={() => mouseOn('promoter', true)} onMouseLeave={() => mouseOn('promoter', false)} onClick={() => goTo('promoter')} />
        <path d="M1250,567.33c-2.06,3.47-14.52,4.54-19.34,6-4.42,1.34-10.26,3.49-14.67,4.67-5.74,1.53-14-1-18.67-2l-44.68-4.67q1.33-16.66,2.67-33.33c.37-1.67,1.71-6.76,1.33-8.67s-3.76-4.82-4.32-6.67c.22-5.33-.32-10.67-.32-16V468c3-2.6,3.69-6,4.67-8,2.37-4.95-.67-13.72,1.33-18V424c22-4.19,46-.75,70-.67v16c1,2.27,3,5.07,2.33,8s-2.79,6.76-3.84,9.33c-2.21,5.41-2.37,10.59-4.59,16-.49,1.21-2.47,3.92-2.63,5.33-.29,2.53,6.81,19,8,22,6.37,15.57,9.85,32.33,16,47.33C1245.94,553.73,1246.1,562.07,1250,567.33Z" onMouseEnter={() => mouseOn('totem', true)} onMouseLeave={() => mouseOn('totem', false)} onClick={() => goTo('totem')} />
      </svg>
    </div>
  )
}