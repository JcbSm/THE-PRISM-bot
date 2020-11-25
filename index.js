const { AkairoClient, CommandHandler, InhibitorHandler, ListenerHandler } = require('discord-akairo');
const { Client } = require('pg');
const config = require('./config');

console.log('\x1b[31m%s\x1b[0m','Initialising...')

try {

	let token, dbURL, prefix, testing;
	try{
		const credentials = require('./keys.json');
		token = credentials.token; dbURL = credentials.database.url; prefix = config.testPrefix; testing = true;
		console.log('Starting locally.')
	} catch(error) {
		token = process.env.TOKEN; dbURL = process.env.DATABASE_URL; prefix = config.prefix; testing = false;
		console.log('Starting on heroku.')
	}

	class BotClient extends AkairoClient {
		constructor() {
			super({
				ownerID: config.owner.id,
			}, {
				disableEveryone: true,
				allowMention: true,
			});

			this.commandHandler = new CommandHandler(
				this,
				{
					directory: './commands/',
					prefix: prefix
				}
			);
			this.inhibitorHandler = new InhibitorHandler(this, {
				directory: './inhibitors/'
			});

			this.listenerHandler = new ListenerHandler(this, {
				directory: './listeners/'
			});

			this.commandHandler.useListenerHandler(this.listenerHandler);
			this.commandHandler.useInhibitorHandler(this.inhibitorHandler);
			
			this.listenerHandler.setEmitters({
				commandHandler: this.commandHandler,
				inhibitorHandler: this.inhibitorHandler,
				listenerHandler: this.listenerHandler
			});
			
			console.log('Loading Modules...')
			this.commandHandler.loadAll()
			this.listenerHandler.loadAll()
			this.inhibitorHandler.loadAll()
			console.log('\x1b[32m%s\x1b[0m', 'All modules lodaded')
		}
	}
	const client = new BotClient();

	client.testing = testing
	
	client.db = new Client({
		connectionString: dbURL,
		ssl: {
			rejectUnauthorized: false
		}
	});

	(async function dbConnect() {

		console.log('Connecting to Database...')
		try{
			await client.db.connect()
			console.log('\x1b[32m%s\x1b[0m', 'Connection to Database established.')
		} catch(error)
		{
			console.log(error)
		}
	}())

	client.on('raw', async packet => { 
 		if (!['MESSAGE_REACTION_ADD', 'MESSAGE_REACTION_REMOVE'].includes(packet.t)) return;
		const channel = await client.channels.fetch(packet.d.channel_id);
		if (channel.messages.cache.has(packet.d.message_id)) return;
		channel.messages.fetch(packet.d.message_id).then(message => {
			const emoji = packet.d.emoji.id ? `${packet.d.emoji.name}:${packet.d.emoji.id}` : packet.d.emoji.name;
			const reaction = message.reactions.cache.get(emoji);
			if (reaction) reaction.users.cache.set(packet.d.user_id, client.users.fetch(packet.d.user_id));
			if (packet.t === 'MESSAGE_REACTION_ADD') {
				client.emit('messageReactionAdd', reaction, client.users.fetch(packet.d.user_id));
			}
			if (packet.t === 'MESSAGE_REACTION_REMOVE') {
				client.emit('messageReactionRemove', reaction, client.users.fetch(packet.d.user_id));
			}
		});
	});
	client.login(token);
} catch(e) {

	console.log(e)
}