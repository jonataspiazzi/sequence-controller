import React, { useEffect, useRef } from 'react';
import { setup } from './three';
import './canvas.scss';

export default function Three() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setup(canvasRef.current, arrowRef.current);
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100vw", height: "100vh" }}>
      <div className="buffer-360">
        <canvas ref={canvasRef}>
        </canvas>
        <div className="hud">
          <div className="arrow" ref={arrowRef}>
          </div>
        </div>
      </div>
    </div>
  );
}