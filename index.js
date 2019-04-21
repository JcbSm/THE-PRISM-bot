const { AkairoClient } = require('discord-akairo');
const Discord = require('discord.js');
const tokenfile = require('./token.json');
const config = require('./config.json');

const client = new AkairoClient({
    ownerID: '227848397447626752',
    prefix: config.prefix,
    allowMention: true,
    commandDirectory: './commands/',
    inhibitorDirectory: './inhibitors/',
    listenerDirectory: './listeners/',
}, {
    disableEveryone: true
});

client.on('ready', () => {
    if(client.guilds.size === 1) {
        client.user.setActivity(`over ${client.guilds.size} server. | ${config.prefix}help`, {type: 'WATCHING'})
    } else {
        client.user.setActivity(`over ${client.guilds.size} servers. | ${config.prefix}help`, {type: 'WATCHING'})
    }
})

client.login(tokenfile.token);