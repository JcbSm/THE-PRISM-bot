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

    client.user.setActivity(`▲`, {type: 'WATCHING'})
    /*if(client.guilds.size === 1) {
        client.user.setActivity(`over ${client.guilds.size} server. | ${config.prefix}help`, {type: 'WATCHING'})
    } else {
        client.user.setActivity(`over ${client.guilds.size} servers. | ${config.prefix}help`, {type: 'WATCHING'})
    }*/
})

//client.on('debug', console.log)

client.on('raw', packet => {
    
    if (!['MESSAGE_REACTION_ADD', 'MESSAGE_REACTION_REMOVE'].includes(packet.t)) return;
    const channel = client.channels.get(packet.d.channel_id);
    if (channel.messages.has(packet.d.message_id)) return;
    
    channel.fetchMessage(packet.d.message_id).then(message => {
        
        const emoji = packet.d.emoji.id ? `${packet.d.emoji.name}:${packet.d.emoji.id}` : packet.d.emoji.name;
        const reaction = message.reactions.get(emoji);
        
		if (reaction) reaction.users.set(packet.d.user_id, client.users.get(packet.d.user_id));
		
        if (packet.t === 'MESSAGE_REACTION_ADD') {
            client.emit('messageReactionAdd', reaction, client.users.get(packet.d.user_id));
        }
        if (packet.t === 'MESSAGE_REACTION_REMOVE') {
            client.emit('messageReactionRemove', reaction, client.users.get(packet.d.user_id));
        }
    });
});

client.login(config['token']);