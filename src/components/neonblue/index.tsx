import React, { useState, useEffect } from 'react';
import DFlow from '../dFlow';
import Flow, { flowController } from '../dFlow/flow';
import { assetsList, assets } from './assets/config';
import './index.scss';
import HelpScreen from '../dFlow/helpScreen';
import { EventEmitter } from 'events';
import TotemsScreen, { ScreenName } from './totemsScreen';
import Visible from '../dFlow/visible';
import CameraHelp from './cameraHelp';

export default function NeonblueIndex() {
  const [helpVisible, setHelpVisible] = useState(true);
  const [totemVisible, setTotemVisible] = useState(false);
  const [cameraVisible, setCameraVisible] = useState(false);

  function finishHelp() {
    setHelpVisible(false);
    setTotemVisible(true);
  }

  function goTo(screen: ScreenName) {
    setTotemVisible(false);

    switch (screen) {
      case 'camera':
        flowController.setVideo(assets.videoCameraF);
        flowController.addEventListenerOnce('ended', () => {
          setCameraVisible(true);
        });
        flowController.play();
    }
  }

  function onCameraClosed() {
    console.log('entrou');
    setCameraVisible(false);

    flowController.setVideo(assets.videoCameraB);
    flowController.addEventListenerOnce('ended', () => {
      setTotemVisible(true);
    });
    flowController.play();
  }

  return (
    <div className="container">
      <DFlow assets={assetsList} splash={assets.frameInitial}>
        <Visible visible={helpVisible}>
          <HelpScreen asset={assets.layerHelp} onHelped={finishHelp}>
            <svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">
              <rect className="ok-button" x="517.9" y="340" width="258.35" height="53.59" />
            </svg>
          </HelpScreen>
        </Visible>
        <Visible visible={totemVisible}>
          <TotemsScreen goTo={goTo} />
        </Visible>
        <Visible visible={cameraVisible} >
          <CameraHelp onClose={onCameraClosed} />
        </Visible>
      </DFlow>
    </div>
  )
}
