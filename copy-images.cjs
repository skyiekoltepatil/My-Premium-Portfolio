const fs = require('fs');
const path = require('path');

const srcDir = '/Users/anakolte/Documents/GitHub/My-Premium-Portfolio/src/assets';
const destDir = '/Users/anakolte/Documents/GitHub/My-Premium-Portfolio/public/assets/projects';

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const files = [
  'Project-1-image.webp',
  'Project-2-image.webp',
  'Project-3-image.webp',
  'weather-image.webp',
  'sculpture-hover.webp'
];

for (const file of files) {
  const src = path.join(srcDir, file);
  const dest = path.join(destDir, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`Copied ${file}`);
  } else {
    console.log(`Skipped ${file}, not found`);
  }
}
