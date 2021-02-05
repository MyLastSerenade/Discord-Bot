const axios = require('axios');

module.exports = {
    name: 'btc',
    cooldown: 500,
    description: 'Make an api call',
    execute(message, args) {
        axios.get('https://blockchain.info/tobtc?currency=USD&value=500')
        .then((res) => {
            console.log('RES', res.data)
        })
        .catch((err) => {
            console.log('ERR', err)
        })
    }
}