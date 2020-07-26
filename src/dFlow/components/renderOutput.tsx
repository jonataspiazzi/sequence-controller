import React, { useEffect, useRef } from 'react';
import { bufferControl } from '../controls/bufferControl';

export default function RenderOutput() {
  const buff0Ref = useRef<HTMLVideoElement>(null);
  const buff1Ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    bufferControl.addBuffer(0, buff0Ref.current);
    bufferControl.addBuffer(1, buff1Ref.current);
  }, []);

  return (
    <div className={`screen flow`}>
      <video ref={buff0Ref} className="full-child buffer-0" />
      <video ref={buff1Ref} className="full-child buffer-1" />
    </div>
  );
}