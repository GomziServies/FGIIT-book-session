import puppeteer from 'puppeteer';

(async () => {
  try {
    const browser = await puppeteer.launch({
      headless: "new",
      protocolTimeout: 60000,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    
    // Set a good desktop viewport
    await page.setViewport({ width: 1440, height: 900 });

    // Go to the local Vite server
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle0', timeout: 60000 });

    // Take a full page screenshot
    await page.screenshot({ path: 'screenshot.png', fullPage: true });

    // We can also take screenshots of specific sections or simulate clicks here
    // e.g., click "Book Demo Class" and wait for modal, then take screenshot
    // ...

    await browser.close();
    console.log('Screenshot taken successfully.');
  } catch (err) {
    console.error('Error taking screenshot:', err);
    process.exit(1);
  }
})();
