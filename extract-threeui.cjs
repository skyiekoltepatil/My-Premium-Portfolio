const fs = require('fs');
const path = require('path');
const https = require('https');

const jsonPath = '/Users/anakolte/.gemini/antigravity-ide/brain/6035ae3c-10a2-46a7-98e7-e49e4b5ad62a/.system_generated/steps/38/content.md';
const content = fs.readFileSync(jsonPath, 'utf8');
const data = JSON.parse(content.substring(content.indexOf('{')));
const outDir = '/Users/anakolte/Documents/GitHub/My-Premium-Portfolio';

async function processFile(file) {
    const fullPath = path.join(outDir, file.path);
    const dir = path.dirname(fullPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    if (file.code) {
        fs.writeFileSync(fullPath, file.code, 'utf8');
        console.log(`Wrote ${file.path}`);
    } else if (file.sourceUrl) {
        const url = 'https://threeui.com' + file.sourceUrl;
        return new Promise((resolve, reject) => {
            https.get(url, (res) => {
                let data = '';
                res.on('data', chunk => data += chunk);
                res.on('end', () => {
                    fs.writeFileSync(fullPath, data, 'utf8');
                    console.log(`Downloaded ${file.path}`);
                    resolve();
                });
            }).on('error', reject);
        });
    }
}

async function main() {
    for (const file of data.files) {
        await processFile(file);
    }
    console.log('Done.');
}

main().catch(console.error);
