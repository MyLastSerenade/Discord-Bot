const axios = require('axios');

module.exports = {
    name: 'rank',
    cooldown: 500,
    description: 'Get your Rank on the Ladder',
    execute(message, args) {
        var url = "https://api.ageofempires.com/api/ageiv/EventLeaderboard";
   
        var payload = {
            "region": 0,
            "versus": "players",
            "matchType": "1",
            "teamSize": "1v1",
            "searchPlayer": "",
            "page": 1,
            "count": 100
          }
          
        
        async function aoeivApiRequest(url, name) {
            payload.searchPlayer = name;
            await axios.post(url, payload)
                .then((res) => {
                    json = res.data
                    message.channel.send(json.items.length + " Player with the name " + name + " were found!")
                    json.items.forEach(element => {
                        message.channel.send("Region: " + element.region)
                        message.channel.send("ELO: " + element.elo)
                        message.channel.send("Rank: " + element.rankLevel + " Number " + element.rank + " on the Ladder")
                    });
                })
                .catch((err) => {
                    console.log('ERR', err)
                });
        }
        
        aoeivApiRequest(url, String(args));
   
   
    }
}