module.exports = {
    name: 'server',
    cooldown: 5,
    description: 'Server',
    execute(message, args) {
        message.channel.send(`This server's name is: ${message.guild.name}\nTotla members: ${message.guild.memberCount}`);
    },
};