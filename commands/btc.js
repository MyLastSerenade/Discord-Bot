const axios = require('axios');
const reload = require('./reload');

module.exports = {
    name: 'btc',
    cooldown: 500,
    description: 'Make an api call',
    execute(message, args) {
        axios.get('https://blockchain.info/ticker')
        .then((res) => {
            console.log('RES', res.data.EUR)
            message.channel.send('1 Bitcoin ist zur Zeit ' + res.data.EUR["last"] + res.data.EUR["symbol"] + " Wert")
        })
        .catch((err) => {
            console.log('ERR', err)
        })
    }
}