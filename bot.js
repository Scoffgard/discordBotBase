const Discord = require('discord.js');
const config = require('./configs/main.json');

const client = new Discord.Client();

client.on('ready', () => {
    const Ready = require('./events/ready');
    new Ready(client, config).run();
});

client.on('message', message => {
    if(message.channel.type == 'dm') return;
    if(message.author.bot) return;
    if(message.content.charAt(0) != config.prefix) return;

    const args = message.content.slice(1).split(' ');
    const command = args.shift();

    try {
        const Command = require(`./commands/${command}`);
        new Command(client, message, args, config).run();
        console.log(`${message.author.username}#${message.author.discriminator} issued command ${command} with args '${args.join(' ')}' | Success`);
    } catch (e) {
        message.reply(`Commande inconnue. Utilisez ${config.prefix}help pour obtenir de l'aide sur les commandes disponibles.`);
        console.log(`${message.author.username}#${message.author.discriminator} issued command ${command} with args '${args.join(' ')}' | Fail`);
    }
});

client.login(config.token);