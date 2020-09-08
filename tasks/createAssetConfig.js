const path = require('path');
const fs = require('fs');
const dir = './src/components/dreamhouse/assets';

const files = fs.readdirSync(dir);

let output = '';

output += `
import { AssetInfo, AudioInfo, VideoInfo, ImageInfo, FrameSequenceInfo } from '../../dFlow/dataModels/assetInfo';

export const assets = {
`;

for (const file of files) {
  let className = '';
  let mime = '';
  let propName = file.replace(path.extname(file), '');

  switch (path.extname(file)) {
    case '.mp4':
      const r = /\.fs\.(\d+)/.exec(propName);
      if (r) {
        propName = propName.replace(r[0], '');
        className = 'FrameSequenceInfo';
        mime = `, ${r[1]}`;
        break;
      }
      className = 'VideoInfo';
      mime = '';
      break;
    case '.jpg':
      className = 'ImageInfo';
      mime = `, 'image/jpg'`;
      break;
    case '.png':
      className = 'ImageInfo';
      mime = '';
      break;
    case '.mp3':
      className = 'AudioInfo';
      mime = '';
      break;
  }

  const { size } = fs.statSync(path.join(dir, file));

  output += `  ${propName}: new ${className}(require('./assets/${file}'), ${size}${mime}),\r\n`;
}

output += `
};

export const assetsList: AssetInfo[] = Object.getOwnPropertyNames(assets).map(prop => (assets as any)[prop]);
`;

fs.writeFileSync('./src/components/dreamhouse/assetsConfig.ts', output);

console.log('done');