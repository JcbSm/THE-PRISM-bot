const { AkairoClient, CommandHandler, InhibitorHandler, ListenerHandler } = require('discord-akairo');
const Discord = require('discord.js');
const config = require('./config')

try {
	function getConfig() {
		try {
			const tokenFile = require('./token.json')
			const token = tokenFile.token;
			const prefix = config.testPrefix;
			console.log('Starting using locally stored value for token.');
			return {'token': token, 'prefix': prefix}
		}
		catch(error) {
			const token = process.env.TOKEN;
			const prefix = config.prefix;
			console.log('Starting using token stored on Heroku');
			return {'token': token, 'prefix': prefix}
		}
	}

	const cfg = getConfig();

	class Client extends AkairoClient {
		constructor() {
			super({
				ownerID: config.owner.id
			}, {
				disableEveryone: true,
				allowMention: true
			});

			this.commandHandler = new CommandHandler(
				this,
				{
					directory: './commands/',
					prefix: cfg['prefix']
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
			
			this.commandHandler.loadAll();
			this.inhibitorHandler.loadAll();
			this.listenerHandler.loadAll();	
		}
	}

	/*const client = new AkairoClient({
		ownerID: '227848397447626752',
		prefix: config['prefix'],
		allowMention: true,
		commandDirectory: './commands/',
		inhibitorDirectory: './inhibitors/',
		listenerDirectory: './listeners/',
	}, {
		disableEveryone: true
	});*/

	const client = new Client();


	client.on('raw', async packet => {

		try {   

			// We don't want this to run on unrelated packets
			if (!['MESSAGE_REACTION_ADD', 'MESSAGE_REACTION_REMOVE'].includes(packet.t)) return;
			// Grab the channel to check the message from
			const channel = await client.channels.fetch(packet.d.channel_id);
			// There's no need to emit if the message is cached, because the event will fire anyway for that
			if (channel.messages.cache.has(packet.d.message_id)) return;
			// Since we have confirmed the message is not cached, let's fetch it
			channel.messages.fetch(packet.d.message_id).then(message => {
				// Emojis can have identifiers of name:id format, so we have to account for that case as well
				const emoji = packet.d.emoji.id ? `${packet.d.emoji.name}:${packet.d.emoji.id}` : packet.d.emoji.name;
				// This gives us the reaction we need to emit the event properly, in top of the message object
				const reaction = message.reactions.cache.get(emoji);
				// Adds the currently reacting user to the reaction's users collection.
				if (reaction) reaction.users.cache.set(packet.d.user_id, client.users.fetch(packet.d.user_id));
				// Check which type of event it is before emitting
				if (packet.t === 'MESSAGE_REACTION_ADD') {
					client.emit('messageReactionAdd', reaction, client.users.fetch(packet.d.user_id));
				}
				if (packet.t === 'MESSAGE_REACTION_REMOVE') {
					client.emit('messageReactionRemove', reaction, client.users.fetch(packet.d.user_id));
				}

			});
			
		} catch(e) {console.log(e)}    
	});

	client.login(cfg['token']);

} catch(e) {console.log(e)}