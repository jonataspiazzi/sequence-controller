import React, { useRef, useEffect } from 'react';
import { makeNativeNavigator } from './nativeNavigator';
import './index.scss';

export default function Navigator() {
  const imgRef = useRef<HTMLImageElement>(null);
  const controllerRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const images = [];

    for (let i = 0; i <= 100; i += Math.floor(100 / 36)) {
      images.push(require(`./render/_0${i.toString().padStart(3, '0')}.jpg`));
    }

    makeNativeNavigator({
      frameElement: imgRef.current,
      controllerElement: controllerRef.current,
      loadingElement: loadingRef.current,
      frames: images,
      useDynamicTick: true
    });
  }, []);

  return (
    <div className="navigator">
      <div className="navigator-box">
        <img alt="" ref={imgRef} className="navigator-img" />
        <div className="navigator-controller" ref={controllerRef}></div>
        <div className="navigator-loading" ref={loadingRef}>
          <span className="tool-bar">Carregando a sua experiência virtual online. <span className="percentage">20</span>%</span>
          <div className="progress">
            <div className="bar"></div>
          </div>
        </div>
      </div>
    </div>
  )
}