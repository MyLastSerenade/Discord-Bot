const puppeteer = require('puppeteer');

module.exports = {
    name: 'scrap',
    cooldown: 5,
    description: 'scraping for some text',
    execute(message, args) {
        const chromeOptions = {
            headless: true,
            defaultViewport: null,
            args: [
                "--no-sandbox"
            ],
        };
        async function scrapeChannel(url) {
            const browser = await puppeteer.launch(chromeOptions);
            const page = await browser.newPage();
            await page.goto(url);

            const [el] = await page.$x('/html/body/div[2]/div[2]/div[4]/div/div/p[1]/b')
            const text = await el.getProperty('textContent');
            const name = await text.jsonValue();
            browser.close();
            console.log({ name })
            message.channel.send("Die 7-Tage-Inzidenz im Kreis Heinsberg liegt bei" + name.name)
            return { name }
        }
        scrapeChannel('https://www.corona-in-zahlen.de/landkreise/lk%20heinsberg/');


    },
};
