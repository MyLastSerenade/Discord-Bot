module.exports = {
    name: 'beep',
    cooldown: 5,
    description: 'Beep!',
    execute(message, args) {
        message.channel.send('Boop.');
    },
};