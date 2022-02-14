//Only Works with the dependencies from https://elements.heroku.com/buildpacks/jontewks/puppeteer-heroku-buildpack
const puppeteer = require('puppeteer');

module.exports = {
    name: 'de',
    cooldown: 5,
    description: 'scraping for invasive patients in Germany',
    execute(message, args) {
        const chromeOptions = {
            headless: true,
            defaultViewport: null,
            args: [
                "--no-sandbox"
            ],
        };
        var xp = '/html/body/div[3]/div[5]/div[2]/div[1]/div/div/p[1]/b';
        var url = 'https://www.corona-in-zahlen.de/weltweit/deutschland/';

        var cn = "in Deutschland!"

        async function scrapeSiteForNationalInvasivePatients(url, xpath, region) {
            const browser = await puppeteer.launch(chromeOptions);
            const page = await browser.newPage();
            await page.goto(url);

            const [el] = await page.$x(xpath)
            const text = await el.getProperty('textContent');
            const name = await text.jsonValue();
            browser.close();
            nameWithoutDot = name.replace(".", ",")
            message.channel.send("Zur Zeit gibt es " + nameWithoutDot + " Intensivmedizinisch behandelte COVID‑19 Patienten in " + region);
            message.channel.send("Quelle: " + url);
        }

        scrapeSiteForNationalInvasivePatients(url, xp, cn);
    },
}