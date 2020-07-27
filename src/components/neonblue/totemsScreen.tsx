import React, { useState, useEffect } from 'react';
import { assets } from './assetsConfig';
import { useAssetSource, useOrbitalX } from '../../dFlow/components/hooks';
import Overlay from '../../dFlow/components/overlay';
import { bufferControl } from '../../dFlow/controls/bufferControl';

export type ScreenName = 'camera' | 'promoter' | 'notebook';

export interface TotemsScreenProps {
  goTo: (screen: ScreenName) => void;
}

export default function TotemsScreen(props: TotemsScreenProps) {
  const bg = useAssetSource(assets.frameInitial);
  const orbitalRef = useOrbitalX<SVGPolygonElement>(assets.video180, 'cursor-left', 'cursor-center', 'cursor-right');

  const [highlightCamera, setHighlightCamera] = useState(false);
  const [highlightPromoter, setHighlightPromoter] = useState(false);
  const [highlightNotebook, setHighlightNotebook] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    (async () => {
      await bufferControl.setVideo(assets.video180);
      await bufferControl.setFrame(.5);
    })();
  }, []);

  function mouseOn(totem: ScreenName, on: boolean) {
    switch (totem) {
      case 'camera': setHighlightCamera(on); break;
      case 'promoter': setHighlightPromoter(on); break;
      case 'notebook': setHighlightNotebook(on); break;
    }
  }

  function goTo(totem: ScreenName) {
    setVisible(false);
    setTimeout(() => {
      props.goTo(totem);
    }, 300);
  }

  return (
    <div className={`screen totem-screen ${visible ? '' : 'hide'}`}>
      {/*<img className="background" src={bg} alt="" />*/}
      <Overlay asset={assets.layerTotemCameraHighlight} visible={highlightCamera} />
      <Overlay asset={assets.layerTotemPromoterHighlight} visible={highlightPromoter} />
      <Overlay asset={assets.layerTotemNotebookHighlight} visible={highlightNotebook} />
      <svg viewBox="0 0 1280 720" className="action-layer">
        <polygon points="1280 0 1280 382.59 853.34 382.59 722 251.25 558 251.25 426.66 382.59 0 382.59 0 0 1280 0" ref={orbitalRef} />
        <path d="M358.67,484V465l31-7.67,26.33,10L419.67,478l45,4.67L464.33,540c39.5,10.73,49,19.68,49,26.33-.08,18.32-72.63,35-132.67,36.67-52.65,1.5-120.51-7.77-122-24.67-.55-6.26,7.8-15.91,49.33-30.33l-.67-54Z" transform="translate(0 0)" onMouseEnter={() => mouseOn('camera', true)} onMouseLeave={() => mouseOn('camera', false)} onClick={() => goTo('camera')} />
        <path d="M628.67,395c-6.1,2.18-8.42,8.69-9,10.33a17.74,17.74,0,0,0-.67,10,16.64,16.64,0,0,0,1.33,3.67,9.72,9.72,0,0,0-4.33,1c-3.86,2-3.73,5.51-7.67,10.67-3.65,4.78-5.54,4.05-6.67,7.33-.66,1.93-.67,4.12,1.67,11a114.34,114.34,0,0,0,6,14.33c-6.76-1.76-19.07-3.83-31,1.33-6.21,2.69-8.18,5.54-9,7-4.08,7.29.32,16,1,17.33a16,16,0,0,0-3,10,15.8,15.8,0,0,0,2.67,8,7.33,7.33,0,0,0-1,9.67c-3.22.68-8,1.76-13.67,3.33-18.5,5.11-21.34,8.38-22.33,9.67-3.22,4.17-5.53,11.37-3,17,2.42,5.41,8.37,7.32,31.33,12,19.67,4,29.51,6,36,6.67,10.91,1.09,22.09.86,44,.33,26.21-.63,12.62-1,50.33-2.67,11.93-.54,26.37-1.09,39-9,7.15-4.47,9.34-8.56,10-12,1-5.27-1.46-9.75-2.33-11.33-8.18-14.76-35.78-13.43-37.33-13.33l-2.33-11-.33-16.67A23.77,23.77,0,0,0,701,478.33c-.06-2.55-.2-8.87-4.33-12-3-2.31-6.9-1.87-9-1.67-6.56.63-15.88.88-29.33-.33a38.74,38.74,0,0,0,.33-15c-.88-4.83-2.11-5.83-2.33-10.33-.36-7.1,2.49-8.7,1-12.33-2-4.88-7.73-3.46-10.33-8.33-2.79-5.22,2.55-9.13.33-15C645,397.29,636,392.39,628.67,395Z" transform="translate(0 0)" onMouseEnter={() => mouseOn('promoter', true)} onMouseLeave={() => mouseOn('promoter', false)} onClick={() => goTo('promoter')} />
        <path d="M871.33,479.67c-1.49-.39-3.95-1-7-1.67-14.92-3.17-41.85-9.21-52.33,3.33-1.47,1.76-2.94,4.16-4.67,10-2.61,8.84-5.84,25.63,0,49.33L790.67,544c-17.88,3.64-31,11.35-31.67,20-.89,11.26,19.56,20.58,30,25.33,31.76,14.47,59.42,14.72,98.33,14.67,96.45-.14,117.55-1,124-15,4.83-10.47-1.23-22.49-1.67-23.33-6.84-13.13-24.34-20.16-45-18.67l-1-51.33-46-9.67-1.33-25-43-4.67Z" transform="translate(0 0)" onMouseEnter={() => mouseOn('notebook', true)} onMouseLeave={() => mouseOn('notebook', false)} onClick={() => goTo('notebook')} />
      </svg>
    </div>
  )
}