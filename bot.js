require('dotenv').config();
const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const fetch = require('node-fetch');

const cooldowns = new Discord.Collection();

const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"] });

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

const blueRoleEmoji = '💙';
const gruenRoleEmoji = '💚';
const channel = '802308065537818635';

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

function readyDiscord() {
    console.log('online');
}

client.once('ready', readyDiscord);

if (command === 'cat') {
	const { file } = fetch('https://aws.random.cat/meow').then(response => response.json());

	message.channel.send(file);
}

client.on('messageReactionAdd', async (messageReaction, user) => {
    const message = messageReaction.message;
    const blueRole = message.guild.roles.cache.find(role => role.name === "Blau");
    const gruenRole = message.guild.roles.cache.find(role => role.name === "Grün");
    if (messageReaction.message.partial) await messageReaction.message.fetch();
    if (messageReaction.partial) await messageReaction.fetch();
    if (user.bot) return;
    if (!messageReaction.message.guild) return;

    if (messageReaction.message.channel.id == channel) {
        if (messageReaction.emoji.name === blueRoleEmoji) {
            await messageReaction.message.guild.members.cache.get(user.id).roles.add(blueRole);
        }

        if (messageReaction.emoji.name === gruenRoleEmoji) {
            await messageReaction.message.guild.members.cache.get(user.id).roles.add(gruenRole);
        }
    } else {
        return;
    }
});

client.on('messageReactionRemove', async (messageReaction, user) => {
    const message = messageReaction.message;
    const blueRole = message.guild.roles.cache.find(role => role.name === "Blau");
    const gruenRole = message.guild.roles.cache.find(role => role.name === "Grün");
    if (messageReaction.message.partial) await messageReaction.message.fetch();
    if (messageReaction.partial) await reaction.fetch();
    if (user.bot) return;
    if (!messageReaction.message.guild) return;

    if (messageReaction.message.channel.id == channel) {
        if (messageReaction.emoji.name === blueRoleEmoji) {
            await messageReaction.message.guild.members.cache.get(user.id).roles.remove(blueRole);
        }

        if (messageReaction.emoji.name === gruenRoleEmoji) {
            await messageReaction.message.guild.members.cache.get(user.id).roles.remove(gruenRole);
        }
    } else {
        return;
    }
});


client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    console.log(message.content);

    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (message.messageReactionAdd) {
        console.log(messageReaction);
    }

    if (!command) return;

    if (command.permissions) {
        const authorPerms = message.channel.permissionsFor(message.author);
        if (!authorPerms || !authorPerms.has(command.permissions)) {
            return message.reply('You can not do this!');
        }
    }

    if (command.args && !args.length) {
        let reply = `You didn't provide any arguments, ${message.author}!`;

        if (command.usage) {
            reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
        }

        return message.channel.send(reply);
    }

    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmoount = (command.cooldown || 3) * 1000;

    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmoount;

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before using the \`${command.name}\` command.`)
        }
    }


    try {
        command.execute(message, args);

        if (command.args && !args.length) {
            return message.channel.send(`You didn't provide any arguments, ${message.author}`);
        }
    } catch (console) {
        console.error(error);
        message.reply('there was an error trying to execute that command!')
    }
});

client.login(process.env.TOKEN);
