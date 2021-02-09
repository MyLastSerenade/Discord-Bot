const puppeteer = require('puppeteer-core');

module.exports = {
    name: 'scrap',
    cooldown: 5,
    description: 'scraping for some text',
    execute(message, args) {
       /*  const chromeOptions = {
            headless: true,
            defaultViewport: null,
        }; */
        async function scrapeChannel(url) {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.goto(url);

            const [el] = await page.$x('//*[@id="directory"]/div/p[185]/text()')
            const text = await el.getProperty('textContent');
            const name = await text.jsonValue();
            browser.close();
            console.log({ name })
            message.channel.send(name)
            return { name }
        }
        scrapeChannel('https://www.kreis-heinsberg.de/aktuelles/aktuelles/?pid=5149');


    },   
};
