const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  page.on('pageerror', err => console.error('PAGE ERROR:', err));
  page.on('console', msg => {
    if (msg.type() === 'error') console.log('PAGE LOG ERROR:', msg.text());
  });

  await page.goto('http://localhost:5174/project', { waitUntil: 'networkidle0' });
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Find the iframe
  const iframeElement = await page.$('iframe');
  if (iframeElement) {
    const frame = await iframeElement.contentFrame();
    if (frame) {
      console.log('Found iframe, clicking canvas...');
      // Get the canvas
      const canvas = await frame.$('canvas#scene');
      if (canvas) {
        // Click the middle of the canvas
        const box = await canvas.boundingBox();
        if (box) {
          await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
          await new Promise(resolve => setTimeout(resolve, 2000));
          console.log('Clicked book!');
        }
      } else {
        console.log('No canvas found in iframe.');
      }
    }
  } else {
    console.log('No iframe found on page.');
  }

  await browser.close();
})();
