//Only Works with the dependencies from https://elements.heroku.com/buildpacks/jontewks/puppeteer-heroku-buildpack
const puppeteer = require('puppeteer');

module.exports = {
    name: 'dnw',
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
        async function scrapeChannel(url, stadtName) {
            const browser = await puppeteer.launch(chromeOptions);
            const page = await browser.newPage();
            await page.goto(url);

            const [el] = await page.$x('/html/body/div[3]/div/main/div/div[1]/div/div[2]/div/div[2]/table/tbody/tr[3]/td[3]/div')
            const text = await el.getProperty('textContent');
            const name = await text.jsonValue();
            browser.close();
            message.channel.send("Es sind gerade " + name + "C " + stadtName);
            message.channel.send("Quelle: " + url);
            return { name }
        }
        scrapeChannel('https://www.meteoblue.com/en/weather/week/d%c3%bcren_germany_2934486', "in Düren");
        


    },
};