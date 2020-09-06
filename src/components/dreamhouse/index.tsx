import React, { useState } from 'react';
import { bufferControl } from '../../dFlow/controls/bufferControl';
import { assetsList, assets } from './assetsConfig';
import DFlow from '../../dFlow/components/container';
import HelpScreen from '../../dFlow/components/helpScreen';
import Visible from '../../dFlow/components/visible';
import InitialScreen, { ScreenName } from './initialScreen';
import LiveScreen from './liveScreen';
import PromoterScreen from './promoterScreen';
import TotemScreen from './totemScreen';
import './index.scss';

export default function DreamHouseIndex() {
  const [helpVisible, setHelpVisible] = useState(true);
  const [initialVisible, setInitialVisible] = useState(false);
  const [liveVisible, setLiveVisible] = useState(false);
  const [promoterVisible, setPromoterVisible] = useState(false);
  const [totemVisible, setTotemVisible] = useState(false);

  function finishHelp() {
    setHelpVisible(false);
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
    <div className="container">
      <DFlow assets={assetsList} splash={assets.loading}>
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
      </DFlow>
    </div >
  );
}
