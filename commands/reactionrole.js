const { description } = require("./args-info");
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'reactionrole',
    description: 'Creates a message to reac to, in order to get a specific Role.',
    async execute(message, args, Discord, client) {
        const channel = '802308065537818635';


        const blueRoleEmoji = '💙';
        const gruenRoleEmoji = '💚';

        const embed = new MessageEmbed()
            .setColor('#e42643')
            .setTitle('Choose a team to play on!')
            .setDescription('Gives you a Role on this Server\n\n' + `${blueRoleEmoji} for the blue team\n` + `${gruenRoleEmoji} for the green team!`);

        let messageEmbed = await message.channel.send(embed);
        messageEmbed.react(gruenRoleEmoji);
        messageEmbed.react(blueRoleEmoji);

        message.client.on('messageReactionAdd', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;

            if (reaction.message.channel.id == channel) {
                if (reaction.emoji.name === blueRoleEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(blueRole);
                }

                    if (reaction.emoji.name === gruenRoleEmoji) {
                        await reaction.message.guild.members.cache.get(user.id).roles.add(gruenRole);
                    }
                } else {
                    return;
                }
        });

        message.client.on('messageReactionRemove', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;

            if (reaction.message.channel.id == channel) {
                if (reaction.emoji.name === blueRoleEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(blueRole);
                }

                    if (reaction.emoji.name === gruenRoleEmoji) {
                        await reaction.message.guild.members.cache.get(user.id).roles.remove(gruenRole);
                    }
                } else {
                    return;
                }
            });
    }

}