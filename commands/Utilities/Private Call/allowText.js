const { Command } = require('discord-akairo');
const { colors } = require('../../../config');

class AllowTextClass extends Command {
    constructor() {
        super('allowText', {
            aliases: ['allowText'],
            description: {
                content: 'Allows/Denies users acess to the call\'s text channel. Providing no member will add everyone who is in the voice chat.',
                usage: 'allowtext <member>;<member2>;...',
            },
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
    
                if(message.channel.topic.split(';').shift() !== 'PRIVATE CALL') message.reply('This is not a private call text channel, please either make one or use an existing one.');
                if(message.channel.topic.split(';').shift() === 'PRIVATE CALL') {

                const voiceChannel = message.guild.channels.cache.get(message.channel.topic.split(';').pop())
                const textChannel = message.channel
                const perms = textChannel.permissionOverwrites.filter(p => p.type === 'member')

                let [unresolveable, allow, deny] = [[], [], []]

                if(!args.members) {

                    for(const [ID, member] of await voiceChannel.members) {

                        const memberPerm = perms.get(ID)
                        if(!memberPerm) {

                            await textChannel.createOverwrite(ID, { VIEW_CHANNEL: true })
                            allow.push(member.id); 
                        }
                    }

                } else {

                    const memberArray = args.members.split(';')

                    for(const resolveable of memberArray) {

                        const member = this.client.util.resolveMember(resolveable.trim(), message.guild.members.cache)
                        if(!member) {
                            unresolveable.push(resolveable.trim())
                        } else {

                            if(message.channel.topic.includes(member.id)) {
                                message.reply('You can\'t kick the owner')
                            } else {

                                if(perms.get(member.id)) {
                                    if(perms.get(member.id).allow.serialize().VIEW_CHANNEL){
                                        await textChannel.createOverwrite(member.id, { VIEW_CHANNEL: false })
                                        deny.push(member.id)
                                    } else {
                                        await textChannel.createOverwrite(member.id, { VIEW_CHANNEL: true })
                                        allow.push(member.id)
                                    }
                                } else if(textChannel.permissionOverwrites.get(message.guild.roles.cache.find(r => r.name === '@everyone').id).allow.serialize().VIEW_CHANNEL) {
                
                                    await textChannel.createOverwrite(member.id, { VIEW_CHANNEL: false })
                                    deny.push(member.id)
                    
                                } else {
                                    await textChannel.createOverwrite(member.id, { VIEW_CHANNEL: true })
                                    allow.push(member.id)
                                }
                            }
                        }                        
                    }
                }

                let fieldArray = [];

                if(allow.length > 0) {
                    fieldArray.push({
                        name: 'Allowed',
                        value: `- <@!${allow.join(`>\n- <@!`)}>`
                    })
                }
                if(deny.length > 0) {
                    fieldArray.push({
                        name: 'Denied',
                        value: `- <@!${deny.join(`>\n- <@!`)}>`
                    })
                }
                if(unresolveable.length > 0) {
                    fieldArray.push({
                        name: 'Unresolveable',
                        value: `\`${unresolveable.join(`\n`)}\``
                    })
                }

                if(fieldArray.length === 0) {
                    message.channel.send({ embed: {

                        type: 'rich',
                        title: `No changes made to ${voiceChannel.name}`,
                        color: colors.purple
                    }})
                } else {

                    message.channel.send({ embed: {

                        type: 'rich',
                        title: `Updated ${voiceChannel.name}`,
                        fields: fieldArray,
                        color: colors.purple
                    }})
                }
            }
        }
        
        } catch(error) {
            console.log(error)
        }
    }

}

module.exports = AllowTextClass;