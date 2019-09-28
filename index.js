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


client.on('guildMemberUpdate', (guildMember, newMember) => {

	if(guildMember.guild.id !== '447504770719154192') return;


	const roles = require('./datafiles/roles')

	//Games
	if(roles.filter(r => r.category == 'Games').map(r => r.id).some(id => newMember.roles.has(id))) {
		guildMember.addRole('614511709339779103')
	} else {
		guildMember.removeRole('614511709339779103')
	}

	//Levels
	if(roles.filter(r => r.category == 'Levels').map(r => r.id).some(id => newMember.roles.has(id))) {
		guildMember.addRole('578622055487111189')
	} else {
		guildMember.removeRole('578622055487111189')
	}

	//Economy
	if(roles.filter(r => r.category == 'Economy').map(r => r.id).some(id => newMember.roles.has(id))) {
		guildMember.addRole('578622178979872778')
	} else {
		guildMember.removeRole('578622178979872778')
	}

	//Other
	if(roles.filter(r => r.category == null).map(r => r.id).some(id => newMember.roles.has(id))) {
		guildMember.addRole('578286642670993428')
	} else {
		guildMember.removeRole('578286642670993428')
	}

})


client.login(config['token']);