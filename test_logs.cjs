const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  page.on('console', msg => console.log('BROWSER_LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE_ERROR:', error.message));
  await page.goto('http://localhost:5174/');
  await page.waitForTimeout(2000);
  await browser.close();
})();
