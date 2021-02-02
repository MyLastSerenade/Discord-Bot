module.exports = {
    name: 'cats',
    cooldown: 5,
    description: 'Cats.',
    args: true,
    execute(message, args) {
        message.channel.send('Cats?');
    }
};