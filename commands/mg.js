//Only Works with the dependencies from https://elements.heroku.com/buildpacks/jontewks/puppeteer-heroku-buildpack
const puppeteer = require('puppeteer');

module.exports = {
    name: 'mg',
    cooldown: 5,
    description: 'scraping for some text',
    execute(message, args) {
        const chromeOptions = {
            headless: true,
            defaultViewport: null,
            args: [
                "--no-sandbox"
            ]
        }
        
        async function scrapeForSevenDayIncidence(url) {
            const browser = await puppeteer.launch(chromeOptions);
            const page = await browser.newPage();
            await page.goto(url);

            const [el] = await page.$x('/html/body/div[2]/div[2]/div[4]/div/div/p[1]/b')
            const sevenDayIncidence = await el.getProperty('textContent');
            const sevenDayIncidenceReturn = await sevenDayIncidence.jsonValue();
            browser.close();
            
            return { sevenDayIncidenceReturn }
        }

        async function scrapeForInvasivePatients(url){
            const browser = await puppeteer.launch(chromeOptions);
            const page = await browser.newPage();
            await page.goto(url);

            const [el] = await page.$x('/html/body/div[2]/div[3]/div[1]/div/div/p[1]/b')
            const invaseivePatients = await el.getProperty('textContent');
            const invaseivePatientsReturn = await invaseivePatients.jsonValue();
            browser.close();

            return { invaseivePatientsReturn }
        }

        async function postToChannel(url, stadtName) {
            const a = await scrapeForSevenDayIncidence('https://www.corona-in-zahlen.de/landkreise/sk%20m%C3%B6nchengladbach/');
            const b = await scrapeForInvasivePatients('https://www.corona-in-zahlen.de/landkreise/sk%20m%C3%B6nchengladbach/');

            message.channel.send("Die 7-Tage-Inzidenz " + stadtName + " liegt bei: " + a.sevenDayIncidenceReturn + 
            " Neuinfektionen. Zur Zeit gibt es " + b.invaseivePatientsReturn + " Intensivmedizinisch behandelte COVID‑19 Patienten!");
            message.channel.send("Quelle: " + url);
            
        }
        
    
        postToChannel("https://www.corona-in-zahlen.de/landkreise/sk%20m%C3%B6nchengladbach/", "in Mönchengladabch")


    },
};
