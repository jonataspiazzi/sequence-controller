import React, { useState } from 'react';
import DFlow from '../../dFlow/components/container';
import { bufferControl } from '../../dFlow/controls/bufferControl';
import { assetsList, assets } from './assetsConfig';
import HelpScreen from '../../dFlow/components/helpScreen';
import TotemsScreen, { ScreenName } from './totemsScreen';
import Visible from '../../dFlow/components/visible';
import CameraScreen from './cameraScreen';
import NotebookHelp from './notebookHelp';
import NotebookScreen from './notebookScreen';
import PromoterScreen from './promoterScreen';
import './index.scss';

export default function NeonblueIndex() {
  const [helpVisible, setHelpVisible] = useState(false);
  const [totemVisible, setTotemVisible] = useState(true);
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
        bufferControl.setVideo(assets.videoCameraF);
        bufferControl.addEventListenerOnce('ended', () => {
          setCameraVisible(true);
        });
        bufferControl.play();
        break;

      case 'notebook':
        bufferControl.setVideo(assets.videoNotebookF);
        bufferControl.addEventListenerOnce('ended', () => {
          setNotebookHelpVisible(true);
        });
        bufferControl.play();
        break;

      case 'promoter':
        bufferControl.setVideo(assets.videoPromoterF);
        bufferControl.addEventListenerOnce('ended', () => {
          setPromoterVisible(true);
        });
        bufferControl.play();
        break;
    }
  }

  function onCameraClosed() {
    setCameraVisible(false);

    bufferControl.setVideo(assets.videoCameraB);
    bufferControl.addEventListenerOnce('ended', () => {
      setTotemVisible(true);
    });
    bufferControl.play();
  }

  function onNotebookHelpClosed() {
    setNotebookHelpVisible(false);

    bufferControl.setVideo(assets.videoNotebookB);
    bufferControl.addEventListenerOnce('ended', () => {
      setTotemVisible(true);
    });
    bufferControl.play();
  }

  function onNotebookScreenClosed() {
    setNotebookScreenVisible(false);

    bufferControl.setVideo(assets.videoNotebookB);
    bufferControl.addEventListenerOnce('ended', () => {
      setTotemVisible(true);
    });
    bufferControl.play();
  }

  function onPromoterClosed() {
    setPromoterVisible(false);

    bufferControl.setVideo(assets.videoPromoterB);
    bufferControl.addEventListenerOnce('ended', () => {
      setTotemVisible(true);
    });
    bufferControl.play();
  }

  return (
    <div className="container">
      <DFlow assets={assetsList} splash={assets.frameInitial}>
        <Visible visible={helpVisible}>
          <HelpScreen asset={assets.layerHelp} onHelped={finishHelp}>
            <svg viewBox="0 0 1280 720" className="action-layer">
              <rect className="ok-button" x="517.9" y="340" width="258.35" height="53.59" />
            </svg>
          </HelpScreen>
        </Visible>
        <Visible visible={totemVisible}>
          <TotemsScreen goTo={goTo} />
        </Visible>
        <Visible visible={cameraVisible}>
          <CameraScreen onClose={onCameraClosed} />
        </Visible>
        <Visible visible={notebookScreenVisible}>
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
