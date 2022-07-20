const axios = require('axios');

module.exports = {
    name: 'zins10',
    cooldown: 500,
    description: '10 Years zins',
    execute(message, args) {
        var url = "https://www.vergleich.de/rest-api/tav/zinschart?"

        var todayDate = new Date().toISOString().slice(0, 10);

        function zinsRequest(url, date) {
            var uri = url + "from=" + date + "&until=" + date;
            axios.get(uri)
                .then((res) => {
                    res.data.forEach(element => {
                        message.channel.send("Der Dahrlenszins bei einer Zinsbindung von 10 Jahren beträgt: " + element.zins10Years + "%")
                    })
                })
            
        }
        zinsRequest(url, todayDate);

    }
}