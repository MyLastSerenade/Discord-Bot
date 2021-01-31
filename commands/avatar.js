module.exports = {
    name: 'avatar',
    aliases: ['icon', 'pfp'],
    cooldown: 5,
    description: 'Avatar',
    execute(message, args) {
        message.channel.send(`Your avatar: <${message.author.displayAvatarURL({ format: 'png', dynamic: true})}>`);
        
    },
};