import React, { useRef, useEffect } from 'react';
import { makeNativeNavigator } from './nativeNavigator';
import './index.scss';

export default function Navigator() {
  const imgRef = useRef<HTMLImageElement>(null);
  const controllerRef = useRef<HTMLDivElement>(null);

  useEffect(() => makeNativeNavigator(imgRef.current, controllerRef.current), []);

  return (
    <div className="navigator">
      <div className="navigator-box">
        <img alt="" ref={imgRef} className="navigator-img" />
        <div className="navigator-controller" ref={controllerRef}></div>
      </div>
    </div>
  )
}