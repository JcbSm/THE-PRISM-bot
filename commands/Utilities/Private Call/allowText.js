const { Command } = require('discord-akairo');

class AllowTextClass extends Command {
    constructor() {
        super('allowText', {
            aliases: ['allowText'],
            args: [
                {
                    id: 'members',
                    type: 'string',
                    match: 'rest'
                }
            ],
            category: 'calls'
        })
    }

    async exec(message, args) {

        try{        
        
            if(message.guild.id === '447504770719154192' || message.guild.id === '569556194612740115') {

                if(!args.members) return message.reply('Please provide at least one member.')
    
                const guild = message.guild
    
                if(message.channel.topic.split(';').shift() !== 'PRIVATE CALL') message.reply('This is not a private call text channel, please either make one or use an existing one.');
                if(message.channel.topic.split(';').shift() === 'PRIVATE CALL') {
                    const textChannel = message.channel
                    const perms = textChannel.permissionOverwrites.filter(p => p.type === 'member')

                    const memberArray = args.members.split(';')
                    let unresolveable = []

                    for(const resolveable of memberArray) {

                        const member = this.client.util.resolveMember(resolveable.trim(), message.guild.members.cache)
                        if(!member) {
                            unresolveable.push(resolveable.trim())
                        } else {

                            if(message.channel.topic.includes(member.user.id)) {
                                message.reply('You can\'t kick the owner')
                            } else {

                                if(perms.get(member.id)) {
                                    if(perms.get(member.id).allow.serialize().VIEW_CHANNEL){
                                        await textChannel.createOverwrite(member.id, { VIEW_CHANNEL: false })
                                        message.channel.send(`***${textChannel.name} is now invisible to ${member.user.tag}***`)
                                    } else {
                                        await textChannel.createOverwrite(member.id, { VIEW_CHANNEL: true })
                                        message.channel.send(`***${textChannel.name} is now visible to ${member.user.tag}***`)
                                    }
                                } else if(textChannel.permissionOverwrites.get(message.guild.roles.cache.find(r => r.name === '@everyone').id).allow.serialize().VIEW_CHANNEL) {
                
                                    await textChannel.createOverwrite(member.id, { VIEW_CHANNEL: false })
                                    message.channel.send(`***${textChannel.name} is now invisible to ${member.user.tag}***`)
                
                                } else {
                                    await textChannel.createOverwrite(member.id, { VIEW_CHANNEL: true })
                                    message.channel.send(`***${textChannel.name} is now visible to ${member.user.tag}***`)
                                }
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

module.exports = AllowTextClass;