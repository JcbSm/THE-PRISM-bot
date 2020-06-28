const { Command } = require('discord-akairo');

class PrivateCallCommand extends Command {
    constructor() {
        super('privatecall', {
            aliases: ['privatecall'],
            description: {
                content: 'Create a temporary private voice channel',
                usage: 'privatecall <user limit> <name>'
            },
            category: 'private calls',
            args: [
                {
                    id: 'num',
                    type: 'number'
                },
                {
                    id: 'name',
                    type: 'string',
                    match: 'rest',
                },
            ],
            split: 'quoted'
        })
    }

    async exec(message, args) {
        try{        
        
        if(message.guild.id === '447504770719154192' || message.guild.id === '569556194612740115') {

            const guild = message.guild
            const everyoneRole = message.guild.roles.cache.find(r => r.name === '@everyone')

            if(args.num > 99) return message.reply('Max user count is 99')

            let name;

            if(args.name) {
                name = `🔒 ${args.name}`
            } else {
                if(message.member.nickname) {
                    name = `🔒 ${message.member.nickname}\'s Channel`
                } else {
                    name = `🔒 ${message.author.username}\'s Channel`
                }
            }

            const voiceChannel = await guild.channels.create(name, {type: 'voice', userLimit: args.num})
            await voiceChannel.createOverwrite(message.author.id, { VIEW_CHANNEL: true })
            await voiceChannel.createOverwrite(this.client.user.id, { VIEW_CHANNEL: true })
            await voiceChannel.createOverwrite(everyoneRole, { VIEW_CHANNEL: true })
            await voiceChannel.setParent('638153434096205846')

            const textChannel = await guild.channels.create(name, { type: 'text'})
            await textChannel.createOverwrite(message.author.id, { VIEW_CHANNEL: true })
            await textChannel.createOverwrite(this.client.user.id, { VIEW_CHANNEL: true })
            await textChannel.createOverwrite(everyoneRole, { VIEW_CHANNEL: false })
            await textChannel.setParent('638153434096205846')
            await textChannel.setTopic(`PRIVATE CALL;${message.member};${voiceChannel.id}`)

            await textChannel.send(
`${message.member} This is your private Voice Chat text channel for ${name}: Here are some commands you can use to change things around:\n
\`\`\`
-endCall: Ends and removes the voice channel
-toggleView: Toggles whether or not other users can see the channel
-toggleUser <member>: Toggles whether or not a user can see the channel
-userLimit <number>: Set the voice channel's user limit
\`\`\`
**THE CHANNELS WILL BE AUTOMATICALLY REMOVED ONCE EVERYONE LEAVES**
`)

        }
    
    }catch(error){console.log(error)}

    }
}

module.exports = PrivateCallCommand