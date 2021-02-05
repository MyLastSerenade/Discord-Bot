const { default: fetch } = require("node-fetch");

module.exports = {
    name: 'btc',
    cooldown: 500,
    description: 'Make an api call',
    execute(message, args) {
        const request = new Request('https://blockchain.info/tobtc?currency=USD&value=500', {method: 'POST', body: '{ list }'});
        const url = request.url;
        const methiod = request.method;
        const bodyUsed = request.bodyUsed;

        fetch(request).then(response => {
            if(response.status === 200) {
                console.log(response.json)
                return response.json();
            } else {
                throw new Error('Something went wrong on api server!')
            }
        })
        .then(response => {
            console.debug(response);
        }) .catch(error => {
            console.error(error);
        });
    }
}