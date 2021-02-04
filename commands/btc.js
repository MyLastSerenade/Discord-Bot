module.exports = {
    name: 'btc',
    cooldown: 500,
    description: 'Make an api call',
    args: true,
    execute(message, args) {
        let request = new XMLHttpRequest();
        request.open("GET", "https://blockchain.info/tobtc?currency=USD&value=500")
        request.onload = () => {
            console.log(request);
            if(request.status == 200) {
                console.log(JSON.parse(request.response));
            } else {
                console.log(`error ${request.status} ${request.statusText}`)
            }
        }
}