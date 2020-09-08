import React, { useState, useRef, useEffect } from 'react';
import { bufferControl } from '../../dFlow/controls/bufferControl';
import { assetsList, assets } from './assetsConfig';
import DFlow from '../../dFlow/components/container';
import HelpScreen from '../../dFlow/components/helpScreen';
import Visible from '../../dFlow/components/visible';
import InitialScreen, { ScreenName } from './initialScreen';
import LiveScreen from './liveScreen';
import PromoterScreen from './promoterScreen';
import TotemScreen from './totemScreen';
import ToolBar from '../../dFlow/components/toolBar';
import AudioButton from '../../dFlow/components/audioButton';
import './index.scss';
import { audioControls } from '../../dFlow/controls/audioControls';

export default function DreamHouseIndex() {
  const dFlowRef = useRef<HTMLDivElement>(null);
  const [helpVisible, setHelpVisible] = useState(true);
  const [initialVisible, setInitialVisible] = useState(false);
  const [liveVisible, setLiveVisible] = useState(false);
  const [promoterVisible, setPromoterVisible] = useState(false);
  const [totemVisible, setTotemVisible] = useState(false);
  const [toolBarVisible, setToolBarVisible] = useState(false);

  function finishHelp() {
    setHelpVisible(false);
    setToolBarVisible(true);
    audioControls.setAudio(assets.loungeMusic);
    bufferControl.setVideo(assets.entrance);
    bufferControl.addEventListenerOnce('ended', () => {
      setInitialVisible(true);
    });
    bufferControl.play();
  }

  function goTo(screen: ScreenName) {
    setInitialVisible(false);

    switch (screen) {
      case 'live':
        bufferControl.setVideo(assets.live);
        bufferControl.addEventListenerOnce('ended', () => {
          setLiveVisible(true);
          setToolBarVisible(false);
          audioControls.disableAudio();
        });
        bufferControl.play();
        break;
      case 'promoter':
        bufferControl.setVideo(assets.receptionForward);
        setTimeout(() => {
          setPromoterVisible(true);
        }, 4000);
        bufferControl.play();
        break;
      case 'totem':
        bufferControl.setVideo(assets.totemFoward);
        bufferControl.addEventListenerOnce('ended', () => {
          setTotemVisible(true);
        });
        bufferControl.play();
        break;
    }
  }

  function finishLive() {
    setLiveVisible(false);
    setInitialVisible(true);
    setToolBarVisible(true);
    audioControls.enableAudio();
  }

  function finishPromoter() {
    setPromoterVisible(false);

    bufferControl.setVideo(assets.receptionBackward);
    bufferControl.addEventListenerOnce('ended', () => {
      setInitialVisible(true);
    });
    bufferControl.play();
  }

  function finishTotem() {
    setTotemVisible(false);

    bufferControl.setVideo(assets.totemBackawrd);
    bufferControl.addEventListenerOnce('ended', () => {
      setInitialVisible(true);
    });
    bufferControl.play();
  }

  return (
    <DFlow assets={assetsList} splash={assets.loading} ref={dFlowRef}>
      <Visible visible={helpVisible}>
        <HelpScreen asset={assets.instrucoes} onHelped={finishHelp} />
      </Visible>
      <Visible visible={initialVisible}>
        <InitialScreen goTo={goTo} />
      </Visible>
      <Visible visible={liveVisible}>
        <LiveScreen onClose={finishLive} />
      </Visible>
      <Visible visible={promoterVisible}>
        <PromoterScreen onClose={finishPromoter} />
      </Visible>
      <Visible visible={totemVisible}>
        <TotemScreen onClose={finishTotem} />
      </Visible>
      <ToolBar visible={toolBarVisible}>
        <AudioButton />
        {/*<FullscreenButtom container={dFlowRef} />*/}
      </ToolBar>
    </DFlow>
  );
}
