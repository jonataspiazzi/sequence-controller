import React, { useState } from 'react';
import DFlow from '../dFlow';
import { flowController } from '../dFlow/flow';
import { assetsList, assets } from './assets/config';
import HelpScreen from '../dFlow/helpScreen';
import TotemsScreen, { ScreenName } from './totemsScreen';
import Visible from '../dFlow/visible';
import CameraHelp from './cameraHelp';
import NotebookHelp from './notebookHelp';
import './index.scss';
import NotebookScreen from './notebookScreen';
import PromoterScreen from './promoterScreen';

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
        flowController.setVideo(assets.videoCameraF);
        flowController.addEventListenerOnce('ended', () => {
          setCameraVisible(true);
        });
        flowController.play();
        break;

      case 'notebook':
        flowController.setVideo(assets.videoNotebookF);
        flowController.addEventListenerOnce('ended', () => {
          setNotebookHelpVisible(true);
        });
        flowController.play();
        break;

      case 'promoter':
        flowController.setVideo(assets.videoPromoterF);
        flowController.addEventListenerOnce('ended', () => {
          setPromoterVisible(true);
        });
        flowController.play();
        break;
    }
  }

  function onCameraClosed() {
    setCameraVisible(false);

    flowController.setVideo(assets.videoCameraB);
    flowController.addEventListenerOnce('ended', () => {
      setTotemVisible(true);
    });
    flowController.play();
  }

  function onNotebookHelpClosed() {
    setNotebookHelpVisible(false);

    flowController.setVideo(assets.videoNotebookB);
    flowController.addEventListenerOnce('ended', () => {
      setTotemVisible(true);
    });
    flowController.play();
  }

  function onNotebookScreenClosed() {
    setNotebookScreenVisible(false);

    flowController.setVideo(assets.videoNotebookB);
    flowController.addEventListenerOnce('ended', () => {
      setTotemVisible(true);
    });
    flowController.play();
  }

  function onPromoterClosed() {
    setPromoterVisible(false);

    flowController.setVideo(assets.videoPromoterB);
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
            <svg viewBox="0 0 1280 720" className="action-layer">
              <rect className="ok-button" x="517.9" y="340" width="258.35" height="53.59" />
            </svg>
          </HelpScreen>
        </Visible>
        <Visible visible={totemVisible}>
          <TotemsScreen goTo={goTo} />
        </Visible>
        <Visible visible={cameraVisible}>
          <CameraHelp onClose={onCameraClosed} />
        </Visible>
        <Visible visible={notebookHelpVisible}>
          <NotebookHelp onClose={onNotebookHelpClosed} />
        </Visible>
        <Visible visible={notebookHelpVisible}>
          <NotebookHelp onClose={onNotebookHelpClosed} />
        </Visible>
        <Visible visible={false}>
          <NotebookScreen onClose={onNotebookScreenClosed} />
        </Visible>
        <Visible visible={promoterVisible}>
          <PromoterScreen onClose={onPromoterClosed} />
        </Visible>
      </DFlow>
    </div>
  )
}
