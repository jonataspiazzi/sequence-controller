import React, { useRef, useEffect } from 'react';
import { createSequenceController } from '../sequenceController';
import { sequenceInfos } from './assets/config';
import splashUrl from './assets/stand-splash.jpg';
import './index.scss';

export default function NeonblueIndex() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    createSequenceController(rootRef.current, sequenceInfos, splashUrl);
  }, []);

  return (
    <div className="container">
      <div className="sequencer" ref={rootRef}>
        <div className="splash">
          <img alt="" />
        </div>
        <div className="loading">
          <p className="status">Carregando a sua experiência virtual online. <span className="percentage">1</span>%</p>
          <div className="progress">
            <div className="bar">
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}