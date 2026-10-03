const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 800 });
  await page.goto('http://localhost:5174/project', { waitUntil: 'networkidle0' });
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const iframeElement = await page.$('iframe');
  if (iframeElement) {
    const frame = await iframeElement.contentFrame();
    if (frame) {
      const canvas = await frame.$('canvas#scene');
      if (canvas) {
        const box = await canvas.boundingBox();
        if (box) {
          // Click to open book
          await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
          await new Promise(resolve => setTimeout(resolve, 2000));
          
          // Click next page 4 times to get to the end
          for (let i = 0; i < 4; i++) {
            await page.mouse.click(box.x + box.width - 100, box.y + box.height / 2);
            await new Promise(resolve => setTimeout(resolve, 1000));
          }
          
          await page.screenshot({ path: 'screenshot.png' });
          console.log('Saved screenshot.png');
        }
      }
    }
  }

  await browser.close();
})();
