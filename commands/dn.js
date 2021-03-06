//Only Works with the dependencies from https://elements.heroku.com/buildpacks/jontewks/puppeteer-heroku-buildpack
const puppeteer = require('puppeteer');

module.exports = {
    name: 'dn',
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

            const [el] = await page.$x('/html/body/div[2]/div[2]/div[4]/div/div/p[1]/b')
            const text = await el.getProperty('textContent');
            const name = await text.jsonValue();
            browser.close();
            message.channel.send("Die 7-Tage-Inzidenz " + stadtName + " liegt bei: " + name + " Neuinfektionen");
            message.channel.send("Quelle: " + url);
            return { name }
        }
        scrapeChannel('https://www.corona-in-zahlen.de/landkreise/lk%20d%C3%BCren/', "in Düren");
        


    },
};
