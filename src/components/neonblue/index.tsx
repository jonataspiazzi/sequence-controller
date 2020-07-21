import React from 'react';
import DFlow from '../dFlow';
import { assetsList } from './assets/config';
import './index.scss';

export default function NeonblueIndex() {
  return (
    <div className="container">
      <DFlow assets={assetsList} />
    </div>
  )
}