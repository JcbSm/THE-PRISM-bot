const Discord = require('discord.js');

function getConfig() {
	try {
		const config = require('./config.json');
		const tokenFile = require('./token.json')
		const token = tokenFile.token;
		const prefix = config.testPrefix;
		console.log('Starting using locally stored value for token.');
		return {'token': token, 'prefix': prefix}
	}
	catch(error) {
		const token = process.env.TOKEN;
		const config = require('./config.json');
		const prefix = config.prefix;
		console.log('Starting using token stored on Heroku');
		return {'token': token, 'prefix': prefix}
	}
}


const config = getConfig();
const { AkairoClient } = require('discord-akairo');
const client = new AkairoClient({
    ownerID: '227848397447626752',
    prefix: config['prefix'],
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

client.login(config['token']);