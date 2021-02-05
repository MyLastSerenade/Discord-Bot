const axios = require('axios');

module.exports = {
    name: 'btc',
    cooldown: 500,
    description: 'Make an api call',
    execute(message, args) {
        axios.get('https://blockchain.info/tobtc?currency=EUR&value=1000')
        .then((res) => {
            console.log('RES', res.data)
            message.channel.send('1000€ sind zur Zeit ', res.data, ' wert!')
        })
        .catch((err) => {
            console.log('ERR', err)
        })
    }
}