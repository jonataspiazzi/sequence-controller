import React, { useState, useRef, useEffect } from 'react';
import { assets } from './assets/config';
import { useAssetSource } from '../dFlow/hooks';

export interface PromoterScreenProps {
  onClose: () => void;
}

type Sender = 'promoter' | 'user';

export interface MessageInfo {
  sender: Sender;
  message: string;
}

const defaultMessages: MessageInfo[] = [{
  sender: 'promoter',
  message: 'Olá, seja bem vindo.'
}, {
  sender: 'promoter',
  message: 'Eu sou a Carol, posso esclarecer informações sobre o produto.'
}, {
  sender: 'user',
  message: 'Esse passeio funciona em qualquer computador?'
}, {
  sender: 'promoter',
  message: 'Sim, funciona até mesmo no navegador do seu celular.'
}, {
  sender: 'user',
  message: 'Você é uma pessoa?'
}, {
  sender: 'promoter',
  message: 'Este produto permite atententes tanto robos (chatbot) quando pessoas. Pode também ser utilizada uma combinação das duas opções.'
}, {
  sender: 'promoter',
  message: 'Agora você pode digitar mensagens, mas eu não irei responder, pois isso é somente uma demonstração.'
}];

export default function PromoterScreen(props: PromoterScreenProps) {
  const messageStackRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [avatar] = useAssetSource(assets.promoterAvatar);
  const [icon] = useAssetSource(assets.sendIcon);
  const [messages, setMessages] = useState<MessageInfo[]>(defaultMessages);
  const [message, setMessage] = useState('');

  useEffect(() => {
    messageStackRef.current.scrollTop = 100000;
  }, [messages]);

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.keyCode === 13) {
      sendMessage();
    }
  }

  function sendMessage() {
    const item = { sender: 'user', message } as MessageInfo;
    const newMessages = [...messages, item];
    setMessages(newMessages);
    setMessage('');
  }

  function onClose() {
    setVisible(false);

    if (typeof props.onClose === 'function') {
      setTimeout(() => {
        props.onClose();
      }, 300);
    }
  }

  return (
    <div className={`screen notebook-help ${visible ? '' : 'hide'}`}>
      <div className="chat">
        <div className="header">
          <img className="avatar" alt="" src={avatar} />
          <span className="promoter-name">Atendente Carol</span>
          <svg viewBox="0 0 32 32" className="close" onClick={onClose}>
            <rect x="13.6" y="-3.8" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -6.6274 16)" width="4.8" height="39.6" />
            <rect x="13.6" y="-3.8" transform="matrix(-0.7071 -0.7071 0.7071 -0.7071 16 38.6274)" width="4.8" height="39.6" />
          </svg>
        </div>
        <div className="message-stack" ref={messageStackRef}>
          {messages.map((m, i) => (
            <div key={i} className={`message-item sender-${m.sender}`}>
              <span>{m.message}</span>
            </div>
          ))}
        </div>
        <div className="input-box">
          <input className="input" type="text" placeholder="Digite sua mensagem." value={message} onChange={e => setMessage(e.target.value)} onKeyDown={onKeyDown} />
          <img className="icon" src={icon} onClick={sendMessage} />
        </div>
      </div>
    </div>
  );
}