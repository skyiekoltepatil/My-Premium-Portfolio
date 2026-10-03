const fs = require('fs');
const path = '/Users/anakolte/Documents/GitHub/My-Premium-Portfolio/public/landing-pages/complete-shelf-v2.html';
let content = fs.readFileSync(path, 'utf8');

// 1. Add images to books
const images = [
  '/assets/projects/Project-1-image.webp',
  '/assets/projects/Project-2-image.webp',
  '/assets/projects/Project-3-image.webp',
  '/assets/projects/weather-image.webp',
  '/assets/projects/sculpture-hover.webp'
];

const regex = /const BOOKS = (\[[\s\S]*?\]);\s*const COVER_ATLAS_DATA/m;
const match = content.match(regex);
if (match) {
  let booksStr = match[1];
  let books;
  eval('books = ' + booksStr);
  
  for (let i = 0; i < images.length; i++) {
    books[i].image = images[i];
  }
  
  const newBooksStr = JSON.stringify(books, null, 2);
  content = content.replace(booksStr, newBooksStr);
}

// 2. Change pageCount from 8 to 10
content = content.replace(/const pageCount = 8;/g, 'const pageCount = 10;');

// 3. Update the page rendering logic
const oldColophonLogic = `        } else {
          ctx.font = '500 11px Inter, "Helvetica Neue", Arial, sans-serif';
          ctx.letterSpacing = "2px";
          ctx.fillText("COLOPHON", 54, 164);`;

const newPageLogic = `        } else if (pageIndex === 7) {
          ctx.font = '500 11px Inter, "Helvetica Neue", Arial, sans-serif';
          ctx.letterSpacing = "2px";
          ctx.fillText("COLOPHON", 54, 164);`;

content = content.replace(oldColophonLogic, newPageLogic);

const oldColophonEnd = `ctx.fillText(\`SPECIMEN \${book.roman} / \${book.seed}  ·  IMAGINED EDITION\`, 54, 676);
        }`;

const newPage8Logic = `ctx.fillText(\`SPECIMEN \${book.roman} / \${book.seed}  ·  IMAGINED EDITION\`, 54, 676);
        } else if (pageIndex === 8) {
          ctx.font = '500 11px Inter, "Helvetica Neue", Arial, sans-serif';
          ctx.letterSpacing = "2px";
          ctx.fillText("PROJECT PREVIEW", 54, 164);
          if (book.image) {
            const img = new Image();
            img.src = book.image;
            img.onload = () => {
              const padding = 54;
              const yOffset = 200;
              const w = logicalWidth - padding * 2;
              const aspect = img.height / img.width;
              let h = w * aspect;
              let xOffset = padding;
              if (h > 420) {
                h = 420;
                const newW = h / aspect;
                xOffset = padding + (w - newW) / 2; // center horizontally
                ctx.drawImage(img, xOffset, yOffset, newW, h);
              } else {
                ctx.drawImage(img, xOffset, yOffset, w, h);
              }
              texture.needsUpdate = true;
            };
          }
        } else {
          // blank page 9
        }`;

content = content.replace(oldColophonEnd, newPage8Logic);

// 4. Update leafOrder < 4 to leafOrder < 5
content = content.replace(/leafOrder < 4\n\s*\? interiorPageMaterials\[leafOrder \* 2\]/g, 'leafOrder < 5\n          ? interiorPageMaterials[leafOrder * 2]');
content = content.replace(/leafOrder < 4\n\s*\? interiorPageMaterials\[leafOrder \* 2 \+ 1\]/g, 'leafOrder < 5\n          ? interiorPageMaterials[leafOrder * 2 + 1]');

fs.writeFileSync(path, content, 'utf8');
console.log('Successfully updated HTML for images');
