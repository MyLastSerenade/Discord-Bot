const axios = require('axios');

module.exports = {
    name: 'rona',
    cooldown: 500,
    description: 'Make an api call to https://api.corona-zahlen.org/',
    execute(message, args) {
        var json;
var agsMap = new Map;

agsMap.set("Heinsberg", "05370")
agsMap.set("Düren", "05358")
agsMap.set("Mönchengladbach", "05116")
agsMap.set("Lippe", "05766")
agsMap.set("Landshut", "09261")
agsMap.set("Gelsenkirchen", "05513")

var url = "https://api.corona-zahlen.org/districts/"

function getDistrict(district){
    return agsMap.get(district)
    
}

async function districts(url, district) {

        let dist = getDistrict(district)
        await axios.get(url + dist)
        .then((res) => {
            json = res.data.data
            if(json[dist] != undefined){
                message.channel.send("Die 7 Tage Inzidenz in " + args + "beträgt: "+  json[dist].weekIncidence.toFixed(2))
            } else if(josn == undefined){
                message.channel.send("Etwas ist schief gelaufen!")
                message.channel.send("Bitte gib Heinsberg, Mönchengladbach, Düren, Lippe, Landshut oder Gelsenkirchen als Parameter an.")
            } else {
                message.channel.send("Etwas ist schief gelaufen!")
                message.channel.send("Bitte gib Heinsberg, Mönchengladbach, Düren, Lippe, Landshut oder Gelsenkirchen als Parameter an.")
            } 
        }) 
}
    

districts(url, String(args));
    }
}