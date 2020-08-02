const { Command } = require('discord-akairo');

class PrivateCallCommand extends Command {
    constructor() {
        super('call', {
            aliases: ['call', 'pcall', 'privatecall'],
            description: {
                content: 'Create a temporary private voice channel',
                usage: 'call/privatecall <user limit> <name>'
            },
            category: 'calls',
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
            
        const command = await this.client.commandHandler.parseCommand(message)
        
        if(message.guild.id === '447504770719154192' || message.guild.id === '569556194612740115') {

            const guild = message.guild
            const everyoneRole = message.guild.roles.everyone

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

            const voiceChannel = await guild.channels.create(name, {
                type: 'voice',
                userLimit: args.num,
                permissionOverwrites: [
                    {
                        id: everyoneRole.id,
                        deny: ['VIEW_CHANNEL']
                    },
                    {
                        id: message.author.id,
                        allow: ['VIEW_CHANNEL']
                    },
                    {
                        id: this.client.user.id,
                        allow: ['VIEW_CHANNEL']
                    }
                ],
                parent: '638153434096205846'
            })
            if(command.alias === 'call') {
                await voiceChannel.createOverwrite(everyoneRole, { VIEW_CHANNEL: true })
            }
            
            const textChannel = await guild.channels.create(name, {
                type: 'text',
                permissionOverwrites: [
                    {
                        id: everyoneRole.id,
                        deny: ['VIEW_CHANNEL']
                    },
                    {
                        id: message.author.id,
                        allow: ['VIEW_CHANNEL']
                    },
                    {
                        id: this.client.user.id,
                        allow: ['VIEW_CHANNEL']
                    }
                ],
                parent: '638153434096205846',
                topic: `PRIVATE CALL;${message.member};${voiceChannel.id}`
            })
            await textChannel.send(
`${message.member} This is your private Voice Chat text channel for ${name}: Here are some commands you can use to change things around:\n
\`\`\`
-endCall: Ends and removes the voice channel
-allowText <member>: Toggles user's view on this channel
-toggleView: Toggles whether or not @everyone can see the channel
-toggleUser <member>: Toggles whether or not a user can see the channel
-userLimit <number>: Set the voice channel's user limit
-rename <name>: renames the channel (only works once for some reason)
-list: Lists the members which have access to the voice channel
\`\`\`
**THE CHANNELS WILL BE AUTOMATICALLY REMOVED 60 SECONDS AFTER EVERYONE LEAVES**
`)

        }
    
    }catch(error){console.log(error)}

    }
}

module.exports = PrivateCallCommand