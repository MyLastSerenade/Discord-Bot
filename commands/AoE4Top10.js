//const axios = require('axios')
const axios = require('axios');

module.exports = {
    name: 'top10',
    cooldown: 500,
    description: 'Make an api call',
    execute(message, args) {
        var url = "https://api.ageofempires.com/api/ageiv/EventLeaderboard";

        function aoe4Top10(url) {
            axios.post(url, {
                "count": 100,
                "matchType": 2,
                "page": 1,
                "region": 7,
                "searchPlayers": "",
                "teamSize": "1v1",
                "versus": "players"
            })
                .then((res) => {
                    message.channel.send("Plätze 1 - 10 auf der Age of Empires 10 Ladder: " + 
                    "\n#1 " + res.data.items[0].userName + " ELO: " + res.data.items[0].elo + 
                    "\n#2 " + res.data.items[1].userName + " ELO: " + res.data.items[1].elo + 
                    "\n#3 " + res.data.items[2].userName + " ELO: " + res.data.items[2].elo + 
                    "\n#4 " + res.data.items[3].userName + " ELO: " + res.data.items[3].elo + 
                    "\n#5 " + res.data.items[4].userName + " ELO: " + res.data.items[4].elo + 
                    "\n#6 " + res.data.items[5].userName + " ELO: " + res.data.items[5].elo + 
                    "\n#7 " + res.data.items[6].userName + " ELO: " + res.data.items[6].elo + 
                    "\n#8 " + res.data.items[7].userName + " ELO: " + res.data.items[7].elo + 
                    "\n#9 " + res.data.items[8].userName + " ELO: " + res.data.items[8].elo + 
                    "\n#10  " + res.data.items[9].userName + " ELO: " + res.data.items[9].elo)
                })
                .catch((err) => {
                    console.log('ERR', err)
                });

        }

        aoe4Top10(url)
    }
}