const puppeteer = require('puppeteer');
(async () => {
 //Scroll to the Bottom of Page
    await autoScroll(page);

    await page.screenshot({
        path: 'yoursite.png',
        fullPage: true
    });
})();
