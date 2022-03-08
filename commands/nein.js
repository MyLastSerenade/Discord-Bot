module.exports = {
    name: 'nein',
    cooldown: 5,
    description: 'nein',
    execute(message, args) {
        message.channel.send({files: ["./nein.mp4"]});
    },
};