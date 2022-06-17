//const axios = require('axios')
const axios = require('axios');

module.exports = {
    name: 'top10',
    cooldown: 500,
    description: 'Make an api call',
    execute(message, args) {
        var url = "https://api.ageofempires.com/api/ageiv/EventLeaderboard";
/*
        let config = {
            ':authority:': 'api.ageofempires.com',
            ':method:': 'POST',
            ':path:': '/api/ageiv/Leaderboard',
            ':scheme:': 'https',
            'accept-encoding:': 'gzip, deflate, br',
            'accept-language:': 'en-GB,en;q=0.9,de-DE;q=0.8,de;q=0.7,en-US;q=0.6',
            'content-length:': '112',
            'content-type:': 'application/json',
            'cookie:': 'MSCC=cid=eyft89yodc0ys53ohl80t6r5-c1=2-c2=2-c3=2; _ga=GA1.2.486142915.1637424630; _gid=GA1.2.272689791.1637424630',
            'origin:': 'https://www.ageofempires.com',
            'referer:': 'https://www.ageofempires.com/',
            'sec-ch-ua:': '" Not A;Brand";v="99", "Chromium";v="96", "Google Chrome";v="96"',
            'sec-ch-ua-mobile:': '?0',
            'sec-ch-ua-platform:': '"Windows"',
            'sec-fetch-dest:': 'empty',
            'sec-fetch-mode:': 'cors',
            'sec-fetch-site:': 'same-site',
            'user-agent:': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36'
        }
*/
        function aoe4Top10(url) {
            axios.post(url, {
                "count": 100,
                "matchType": 1,
                "page": 1,
                "region": 7,
                "searchPlayers": "",
                "teamSize": "1v1",
                "versus": "players"
            })
                .then((res) => {
                    //console.log(res.status)
                    console.log(res.status + res.data.count)
                    message.channel.send("Platz #" + "1" + " auf der Age of Empires 4 Ladder ist: " + res.data.items[0].userName + 
                    "\nPlatz #" + "2" + " auf der Age of Empires 4 Ladder ist: " + res.data.items[1].userName + 
                    "\nPlatz #" + "3" + " auf der Age of Empires 4 Ladder ist: " + res.data.items[2].userName + 
                    "\nPlatz #" + "4" + " auf der Age of Empires 4 Ladder ist: " + res.data.items[3].userName + 
                    "\nPlatz #" + "5" + " auf der Age of Empires 4 Ladder ist: " + res.data.items[4].userName + 
                    "\nPlatz #" + "6" + " auf der Age of Empires 4 Ladder ist: " + res.data.items[5].userName + 
                    "\nPlatz #" + "7" + " auf der Age of Empires 4 Ladder ist: " + res.data.items[6].userName + 
                    "\nPlatz #" + "8" + " auf der Age of Empires 4 Ladder ist: " + res.data.items[7].userName + 
                    "\nPlatz #" + "9" + " auf der Age of Empires 4 Ladder ist: " + res.data.items[8].userName + 
                    "\nPlatz #" + "10" + " auf der Age of Empires 4 Ladder ist: " + res.data.items[9].userName)
                })
                .catch((err) => {
                    console.log('ERR', err)
                });

        }

        aoe4Top10(url)
    }
}