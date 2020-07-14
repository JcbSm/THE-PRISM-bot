const { Command } = require('discord-akairo');

class AllowTextClass extends Command {
    constructor() {
        super('allowText', {
            aliases: ['allowText'],
            args: [
                {
                    id: 'member',
                    type: 'member',
                    match: 'rest'
                }
            ],
            category: 'private calls'
        })
    }

    async exec(message, args) {

        try{        
        
            if(message.guild.id === '447504770719154192' || message.guild.id === '569556194612740115') {
    
                const guild = message.guild
    
                if(message.channel.topic.split(';').shift() !== 'PRIVATE CALL') message.reply('This is not a private call text channel, please either make one or use an existing one.');
                if(message.channel.topic.split(';').shift() === 'PRIVATE CALL') {
                    const textChannel = message.channel
                    const perms = textChannel.permissionOverwrites.filter(p => p.type === 'member')

                    if(!args.member) return message.reply('Please provide a member')
                    if(message.channel.topic.includes(args.member.user.id)) return message.reply('You can\'t kick the owner')

                    if(perms.get(args.member.id)) {
                        if(perms.get(args.member.id).allow.serialize().VIEW_CHANNEL){
                            await textChannel.createOverwrite(args.member.id, { VIEW_CHANNEL: false })
                            message.channel.send(`***${textChannel.name} is now invisible to ${args.member.user.tag}***`)
                        } else {
                            await textChannel.createOverwrite(args.member.id, { VIEW_CHANNEL: true })
                            message.channel.send(`***${textChannel.name} is now visible to ${args.member.user.tag}***`)
                        }
                    } else if(textChannel.permissionOverwrites.get(message.guild.roles.cache.find(r => r.name === '@everyone').id).allow.serialize().VIEW_CHANNEL) {
    
                        await textChannel.createOverwrite(args.member.id, { VIEW_CHANNEL: false })
                        message.channel.send(`***${textChannel.name} is now invisible to ${args.member.user.tag}***`)
    
                    } else {
                        await textChannel.createOverwrite(args.member.id, { VIEW_CHANNEL: true })
                        message.channel.send(`***${textChannel.name} is now visible to ${args.member.user.tag}***`)
                    }
    
    
                }
    
            }
        
        }catch(error){console.log(error)}
    }

}

module.exports = AllowTextClass;