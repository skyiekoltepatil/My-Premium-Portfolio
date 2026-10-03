const fs = require('fs');
const jsonPath = '/Users/anakolte/.gemini/antigravity-ide/brain/6035ae3c-10a2-46a7-98e7-e49e4b5ad62a/.system_generated/steps/38/content.md';
const content = fs.readFileSync(jsonPath, 'utf8');
const data = JSON.parse(content.substring(content.indexOf('{')));
data.files.forEach(f => {
    console.log(f.path, f.code ? 'has_code' : f.sourceUrl);
});
