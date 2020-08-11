const { Command } = require('discord-akairo');
const { colors } = require('../../../config')

class ToggleViewCommand extends Command {
    constructor() {
        super('toggleView', {
            aliases: ['toggleView'],
            description: {
                content: 'Toggles whether or not other users can view the voice channel',
                usage: 'toggleView <role>'
            },
            args: [
                {
                    id: 'role',
                    type: 'role',
                    match: 'rest'
                }
            ],
            category: 'calls',
        })
    }

    async exec(message, args) {
        try{        
        
            if(message.guild.id === '447504770719154192' || message.guild.id === '742026925156860026') {

                const guild = message.guild
                let role;
                
                if(!args.role) {
                    role = message.guild.roles.everyone
                } else {
                    role = args.role
                }

                const [allow, deny] = [[], []];

                if(message.channel.topic.split(';').shift() !== 'PRIVATE CALL') message.reply('This is not a private call text channel, please either make one or use an existing one.');
                if(message.channel.topic.split(';').shift() === 'PRIVATE CALL') {
                    const voiceChannel = message.guild.channels.cache.get(message.channel.topic.split(';').pop())
                    const perms = voiceChannel.permissionOverwrites.get(role.id)
                    
                    if(!perms) {
                        await voiceChannel.createOverwrite(role, { VIEW_CHANNEL: true })
                        allow.push(role.id)

                    } else {

                        if(perms.allow.serialize().VIEW_CHANNEL) {
                            await voiceChannel.createOverwrite(role, { VIEW_CHANNEL: false })
                            deny.push(role.id)
                        } else {
                            await voiceChannel.createOverwrite(role, { VIEW_CHANNEL: true })
                            allow.push(role.id)
                        }
                    }

                    let fieldArray = []

                    if(allow.length > 0) {
                        fieldArray.push({
                            name: 'Allowed',
                            value: `- <@&${allow.join(`>\n- <@&`)}>`
                        })
                    }
                    if(deny.length > 0) {
                        fieldArray.push({
                            name: 'Denied',
                            value: `- <@&${deny.join(`>\n- <@&`)}>`
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

module.exports = ToggleViewCommand