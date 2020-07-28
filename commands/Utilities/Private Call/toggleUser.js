const { Command } = require('discord-akairo');

class ToggleUserCommand extends Command {
    constructor() {
        super('toggleUser', {
            aliases: ['toggleUser', 'toggleUsers'],
            description: {
                content: 'Allows or denies a specific user to view the channel',
                usage: 'toggleUser <user>'
            },
            category: 'calls',
            args: [
                {
                    id: 'members',
                    type: 'string',
                    match: 'rest',
                }
            ]
        })
    }

    async exec(message, args) {
        try{        
        
        if(message.guild.id === '447504770719154192' || message.guild.id === '569556194612740115') {

            if(!args.members) return message.reply('Please provide at least one member.')

            if(message.channel.topic.split(';').shift() !== 'PRIVATE CALL') message.reply('This is not a private call text channel, please either make one or use an existing one.');
            if(message.channel.topic.split(';').shift() === 'PRIVATE CALL') {
                const voiceChannel = message.guild.channels.cache.get(message.channel.topic.split(';').pop())
                const perms = voiceChannel.permissionOverwrites.filter(p => p.type === 'member')

                const memberArray = args.members.split(';')
                let unresolveable = []

                for(const resolveable of memberArray) {

                    const member = this.client.util.resolveMember(resolveable.trim(), message.guild.members.cache)
                    if(!member) {

                        unresolveable.push(resolveable.trim())
                    } else {

                        if(perms.get(member.id)) {
                            if(perms.get(member.id).allow.serialize().VIEW_CHANNEL){
                                await voiceChannel.createOverwrite(member.id, { VIEW_CHANNEL: false })
                                message.channel.send(`***${voiceChannel.name} is now invisible to ${member}***`)
                            } else {
                                await voiceChannel.createOverwrite(member.id, { VIEW_CHANNEL: true })
                                message.channel.send(`***${voiceChannel.name} is now visible to ${member}***`)
                            }
                        } else if(voiceChannel.permissionOverwrites.get(message.guild.roles.everyone.id).allow.serialize().VIEW_CHANNEL) {
        
                            await voiceChannel.createOverwrite(member.id, { VIEW_CHANNEL: false })
                            message.channel.send(`***${voiceChannel.name} is now invisible to ${member}***`)
        
                        } else {
                            await voiceChannel.createOverwrite(member.id, { VIEW_CHANNEL: true })
                            message.channel.send(`***${voiceChannel.name} is now visible to ${member}***`)
                        }
                    }
                }

                if(unresolveable.length > 0) {
                    
                    message.reply(`Unable to resolve: \`${unresolveable.join(', ')}\``)
                }
            }
        }
    
    }catch(error){console.log(error)}

    }
}

module.exports = ToggleUserCommand