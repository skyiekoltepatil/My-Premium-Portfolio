const fs = require('fs');
const path = '/Users/anakolte/Documents/GitHub/My-Premium-Portfolio/public/landing-pages/complete-shelf-v2.html';
let content = fs.readFileSync(path, 'utf8');

// 1. Change PAGINATED_LEAF_COUNT to 5
content = content.replace(/const PAGINATED_LEAF_COUNT = 4;/g, 'const PAGINATED_LEAF_COUNT = 5;');

// 2. Add 6th label to getSpreadLabels
const oldLabels = `    function getSpreadLabels(book) {
      return [
        "Title page",
        \`\${book.chapters[0]} · Plate\`,
        \`\${book.chapters[1]} · Notes\`,
        \`\${book.chapters[2]} · System\`,
        "Colophon"
      ];
    }`;

const newLabels = `    function getSpreadLabels(book) {
      return [
        "Title page",
        \`\${book.chapters[0]} · Plate\`,
        \`\${book.chapters[1]} · Notes\`,
        \`\${book.chapters[2]} · System\`,
        "Colophon · Project Preview",
        "End"
      ];
    }`;

if (content.includes(oldLabels)) {
  content = content.replace(oldLabels, newLabels);
} else {
  // Try regex in case of spacing issues
  content = content.replace(
    /"Colophon"\n\s*\];/g,
    '"Colophon · Project Preview",\n        "End"\n      ];'
  );
}

fs.writeFileSync(path, content, 'utf8');
console.log('Successfully updated HTML for spreads');
