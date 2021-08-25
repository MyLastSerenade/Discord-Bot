//Only Works with the dependencies from https://elements.heroku.com/buildpacks/jontewks/puppeteer-heroku-buildpack
const parser = require("./parser");
module.exports = {
    name: 'hs',
    cooldown: 5,
    description: 'scraping for some text',
    execute(message, args) {
        var xp = '/html/body/div[2]/div[2]/div[4]/div/div/p[1]/b';
        var url = 'https://www.corona-in-zahlen.de/landkreise/lk%20heinsberg/';
        var cn = "im Kreis Heinsberg"

        const dpc = new parser();

        dpc.scrapeChannelForSevenDayIncidence(url, xp, cn);
        dpc.scrapeChannelForIn(url, xp, cn);

    },
};
