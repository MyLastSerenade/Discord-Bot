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

        var xp = '/html/body/div[2]/div[2]/div[4]/div/div/p[1]/b';
        var xp2 = '/html/body/div[2]/div[3]/div[2]/div/div/p[1]/b';
        var url = 'https://www.corona-in-zahlen.de/landkreise/lk%20d%C3%BCren/';

        var cn = "in DÜren"

        async function asyncscrapeChannelForSevenDayIncidence(url, xpath, cityName) {
            const browser = await puppeteer.launch(chromeOptions);
            const page = await browser.newPage();
            await page.goto(url);

            const [el] = await page.$x(xpath)
            const text = await el.getProperty('textContent');
            const name = await text.jsonValue();
            browser.close();
            message.channel.send("Die 7-Tage-Inzidenz " + cityName + " liegt bei: " + name);
        }

        async function scrapeChannelForInvasivePathents(url, xpath) {
            const browser = await puppeteer.launch(chromeOptions);
            const page = await browser.newPage();
            await page.goto(url);

            const [el] = await page.$x(xpath)
            const text = await el.getProperty('textContent');
            const name = await text.jsonValue();
            browser.close();
            message.channel.send("Zur Zeit gibt es " + name + " Intensivmedizinisch behandelte COVID‑19 Patienten!");
            message.channel.send("Quelle: " + url);
        }

        
        
        scrapeChannelForInvasivePathents(url, xp2);
        asyncscrapeChannelForSevenDayIncidence(url, xp, cn);
    },
};
