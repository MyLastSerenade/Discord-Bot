const puppeteer = require('puppeteer');

module.exports = {
    name: 'rnd',
    cooldown: 5,
    description: 'scraping for an img',
    execute(message, args) {
        const chromeOptions = {
            headless: true,
            defaultViewport: null,
            args: [
                "--no-sandbox"
            ],
        };
        min = 0;
        max = 9;
        abcmin = 0;
        abcmax = 23;
        const abc = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

        function random() {
            url = "";
            for (i = 0; i < 7; i++) {
                if (i < 2) {
                    x = Math.floor(Math.random() * (abcmax - abcmin + 1)) + min;
                    x = abc[x];
                    url = url.concat(x);
                }
                if (i > 3) {
                    x = Math.floor(Math.random() * (max - min + 1)) + min;
                    url = url.concat(x);
                }
            }
            return 'https://prnt.sc/' + url;
        }
        async function scrapeChannel(url) {
            const browser = await puppeteer.launch(chromeOptions);
            const page = await browser.newPage();
            await page.goto(url);

            const [el] = await page.$x('//*[@id="screenshot-image"]');
            const src = await el.getProperty('src');
            const name = await src.jsonValue();

            browser.close();
            if (name == 'https://st.prntscr.com/2021/04/08/1538/img/0_173a7b_211be8ff.png') {
                scrapeChannel(random());
            }
            message.channel.send("Random Screenshot " + name);
            return { name };

        }
        scrapeChannel(random());
    },
};