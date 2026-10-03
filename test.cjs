const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.on('console', msg => console.log('BROWSER:', msg.text()));
  page.on('pageerror', err => console.log('BROWSER ERROR:', err));
  await page.goto('http://localhost:5174/landing-pages/complete-shelf-v2.html');
  await new Promise(r => setTimeout(r, 2000));
  await browser.close();
})();
