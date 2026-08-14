
```javascript name=generate-preview.js
// generate-preview.js
// Usage: node generate-preview.js [input.html] [output.png]
// Defaults: input.html -> index.html, output.png -> docs/preview.png

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

(async () => {
  const input = process.argv[2] || 'index.html';
  const output = process.argv[3] || 'docs/preview.png';
  const absInput = path.resolve(input);
  const absOutput = path.resolve(output);

  // ensure output dir exists
  fs.mkdirSync(path.dirname(absOutput), { recursive: true });

  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();

  // size to match the window in the HTML (adjust if needed)
  await page.setViewport({ width: 1180, height: 610, deviceScaleFactor: 1 });

  const url = 'file://' + absInput;
  await page.goto(url, { waitUntil: 'networkidle2' });

  // wait for animations/intro to complete (tweak ms if necessary)
  await page.waitForTimeout(4500);

  await page.screenshot({ path: absOutput, fullPage: false });
  await browser.close();

  console.log('Preview saved to', absOutput);
})();
