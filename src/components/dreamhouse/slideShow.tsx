import React, { useState, useEffect } from 'react';
import { assets } from './assetsConfig';
import { useAssetSource } from '../../dFlow/components/hooks';
import { ImageInfo } from '../../dFlow/dataModels/assetInfo';

export interface SlideShowProps {
  slide: number;
  className: string;
  onChange: (newSlide: number) => void;
  onClose: () => void;
}

export default function SlideShow(props: SlideShowProps) {
  const left = useAssetSource(assets.slideArrowLeft);
  const right = useAssetSource(assets.slideArrowRight);
  const close = useAssetSource(assets.slideClose);

  const lib = [
    useAssetSource(assets.slide01),
    useAssetSource(assets.slide02),
    useAssetSource(assets.slide03),
    useAssetSource(assets.slide04),
    useAssetSource(assets.slide05),
    useAssetSource(assets.slide06)
  ];

  function onLeft() {
    console.log('onLeft');

    if (props.slide <= 0) {
      props.onChange(5);
      return;
    }

    props.onChange(props.slide - 1);
  }

  function onRight() {
    console.log('onRight');

    if (props.slide >= 5) {
      props.onChange(0);
      return;
    }

    props.onChange(props.slide + 1);
  }

  return (
    <div className={`slideshow ${props.className}`}>
      <div className="container">
        {lib.map((src, index) =>
          <img key={index} src={src} className={`item ${index !== props.slide ? 'hide' : ''}`} alt="" />
        )}
      </div>
      <img src={left} alt="" className="left-buttom" onClick={onLeft} />
      <img src={right} alt="" className="right-buttom" onClick={onRight} />
      <img src={close} alt="" className="close-buttom" onClick={props.onClose} />
    </div>
  );
}