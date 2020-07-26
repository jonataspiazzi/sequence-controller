import React, { useState } from 'react';
import DFlow from '../dFlow';
import { flowBufferController } from '../dFlow/flowBuffer';
import { assetsList, assets } from './assets/config';
import HelpScreen from '../dFlow/helpScreen';
import TotemsScreen, { ScreenName } from './totemsScreen';
import Visible from '../dFlow/visible';
import CameraHelp from './cameraHelp';
import NotebookHelp from './notebookHelp';
import NotebookScreen from './notebookScreen';
import PromoterScreen from './promoterScreen';
import './index.scss';

export default function NeonblueIndex() {
  const [helpVisible, setHelpVisible] = useState(true);
  const [totemVisible, setTotemVisible] = useState(false);
  const [cameraVisible, setCameraVisible] = useState(false);
  const [notebookHelpVisible, setNotebookHelpVisible] = useState(false);
  const [notebookScreenVisible, setNotebookScreenVisible] = useState(false);
  const [promoterVisible, setPromoterVisible] = useState(false);

  function finishHelp() {
    setHelpVisible(false);
    setTotemVisible(true);
  }

  function goTo(screen: ScreenName) {
    setTotemVisible(false);

    switch (screen) {
      case 'camera':
        flowBufferController.setVideo(assets.videoCameraF);
        flowBufferController.addEventListenerOnce('ended', () => {
          setCameraVisible(true);
        });
        flowBufferController.play();
        break;

      case 'notebook':
        flowBufferController.setVideo(assets.videoNotebookF);
        flowBufferController.addEventListenerOnce('ended', () => {
          setNotebookHelpVisible(true);
        });
        flowBufferController.play();
        break;

      case 'promoter':
        flowBufferController.setVideo(assets.videoPromoterF);
        flowBufferController.addEventListenerOnce('ended', () => {
          setPromoterVisible(true);
        });
        flowBufferController.play();
        break;
    }
  }

  function onCameraClosed() {
    setCameraVisible(false);

    flowBufferController.setVideo(assets.videoCameraB);
    flowBufferController.addEventListenerOnce('ended', () => {
      setTotemVisible(true);
    });
    flowBufferController.play();
  }

  function onNotebookHelpClosed() {
    setNotebookHelpVisible(false);

    flowBufferController.setVideo(assets.videoNotebookB);
    flowBufferController.addEventListenerOnce('ended', () => {
      setTotemVisible(true);
    });
    flowBufferController.play();
  }

  function onNotebookScreenClosed() {
    setNotebookScreenVisible(false);

    flowBufferController.setVideo(assets.videoNotebookB);
    flowBufferController.addEventListenerOnce('ended', () => {
      setTotemVisible(true);
    });
    flowBufferController.play();
  }

  function onPromoterClosed() {
    setPromoterVisible(false);

    flowBufferController.setVideo(assets.videoPromoterB);
    flowBufferController.addEventListenerOnce('ended', () => {
      setTotemVisible(true);
    });
    flowBufferController.play();
  }

  return (
    <div className="container">
      <DFlow assets={assetsList} splash={assets.frameInitial}>
        <Visible visible={false}>
          <HelpScreen asset={assets.layerHelp} onHelped={finishHelp}>
            <svg viewBox="0 0 1280 720" className="action-layer">
              <rect className="ok-button" x="517.9" y="340" width="258.35" height="53.59" />
            </svg>
          </HelpScreen>
        </Visible>
        <Visible visible={true}>
          <TotemsScreen goTo={goTo} />
        </Visible>
        <Visible visible={cameraVisible}>
          <CameraHelp onClose={onCameraClosed} />
        </Visible>
        <Visible visible={false}>
          <NotebookScreen onClose={onNotebookScreenClosed} />
        </Visible>
        <Visible visible={promoterVisible}>
          <PromoterScreen onClose={onPromoterClosed} />
        </Visible>
        <Visible visible={notebookHelpVisible}>
          <NotebookHelp onClose={onNotebookHelpClosed} />
        </Visible>
      </DFlow>
    </div>
  )
}
