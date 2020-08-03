const { Command } = require('discord-akairo');
const { colors } = require('../../../config')

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
                let [unresolveable, allow, deny] = [[], [], []]

                for(const resolveable of memberArray) {

                    const member = this.client.util.resolveMember(resolveable.trim(), message.guild.members.cache)
                    if(!member) {

                        unresolveable.push(resolveable.trim())
                    } else {

                        if(perms.get(member.id)) {
                            if(perms.get(member.id).allow.serialize().VIEW_CHANNEL){
                                await voiceChannel.createOverwrite(member.id, { VIEW_CHANNEL: false })
                                deny.push(member.id)

                            } else {
                                await voiceChannel.createOverwrite(member.id, { VIEW_CHANNEL: true })
                                allow.push(member.id)
                            }
                        } else if(voiceChannel.permissionOverwrites.get(message.guild.roles.everyone.id).allow.serialize().VIEW_CHANNEL) {
        
                            await voiceChannel.createOverwrite(member.id, { VIEW_CHANNEL: false })
                            deny.push(member.id)
        
                        } else {
                            await voiceChannel.createOverwrite(member.id, { VIEW_CHANNEL: true })
                            allow.push(member.id)
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

                message.channel.send({ embed: {

                    type: 'rich',
                    title: `Updated ${voiceChannel.name}`,
                    fields: fieldArray,
                    color: colors.purple,
                    timestamp: new Date()
                }})
            }
        }
    
    }catch(error){console.log(error)}

    }
}

module.exports = ToggleUserCommand