import puppeteer from 'puppeteer';

const chromeOptions = {
    headless: true,
    defaultViewport: null,
    args: [
        "--no-sandbox"
    ],
};

export default class dataParserClass {
    constructor(url, xpath) {
        this.url = url;
        this.xpath = xpath;
        this.cityName = cityName;

    }


    async scrapeChannelForSevenDayIncidence(url, xpath, cityName) {
        const browser = await puppeteer.launch(chromeOptions);
        const page = await browser.newPage();
        await page.goto(url);

        const [el] = await page.$x(xpath)
        const text = await el.getProperty('textContent');
        const name = await text.jsonValue();
        browser.close();
        message.channel.send("Die 7-Tage-Inzidenz " + cityName + " liegt bei: " + name);
    }

    async scrapeChannelForInvasivePathents(url, xpath, cityName) {
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
}
