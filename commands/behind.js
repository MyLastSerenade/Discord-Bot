module.exports = {
    name: 'behind',
    cooldown: 5,
    description: 'behind',
    execute(message, args) {
        message.channel.send({files: ["./einebehinderungichbeidirspüre2.png"]});
    },
};