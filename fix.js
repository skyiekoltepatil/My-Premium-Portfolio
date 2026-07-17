const fs = require('fs');
const file = './src/components/StickerDrag.tsx';
let content = fs.readFileSync(file, 'utf8');

// The file currently has literal \ followed by $ (e.g. \${canvasWidth})
content = content.replace(/\\\$/g, '$');
// It also has \ followed by ` 
content = content.replace(/\\`/g, '`');

fs.writeFileSync(file, content);
console.log('Fixed escaping!');
