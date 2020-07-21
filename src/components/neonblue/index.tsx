import React, { useState } from 'react';
import DFlow from '../dFlow';
import { assetsList, assets } from './assets/config';
import './index.scss';
import SplashScreen from '../dFlow/splashScreen';
import HelpScreen from '../dFlow/helpScreen';

export default function NeonblueIndex() {
  const [wasHelped, setWasHelped] = useState(false);
  return (
    <div className="container">
      <DFlow assets={assetsList}>
        <SplashScreen asset={assets.frameInitial} />
        {!wasHelped && <HelpScreen asset={assets.layerHelp} onHelped={() => setWasHelped(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">
            <rect className="ok-button" x="517.9" y="340" width="258.35" height="53.59" />
          </svg>
        </HelpScreen>}
      </DFlow>
    </div>
  )
}