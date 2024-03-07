const puppeteer = require('puppeteer');

(async () => {
 //Scroll to the Bottom of Page
    await autoScroll(page);

//Scroll to View
/*    for (let i = 0; i < 20; i++) {
        await page.evaluate((pax0VisaType, i) => {
            const element = document.querySelector(pax0VisaType);
            if(element) {
                element.scrollIntoView();
            }
        }, pax0VisaType);
    }*/
})();

async function autoScroll(page){
    await page.evaluate(async () => {
        await new Promise((resolve) => {
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if(totalHeight >= scrollHeight - window.innerHeight){
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        });
    });
};

// Source: https://github.com/chenxiaochun/blog/issues/38
