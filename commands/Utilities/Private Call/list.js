const { Command } = require('discord-akairo');
const { colors } = require('../../../config')

class ListCommand extends Command {
    constructor() {
        super('list', {
            aliases: ['list'],
            description: {
                content: 'Lists the users that are able to join the call',
                usage: 'list'
            },
            category: 'calls'
        })
    }

    async exec(message) {
try{
        if(message.guild.id === '447504770719154192' || message.guild.id === '742026925156860026') {

            if(message.channel.topic.split(';')[0] !== 'PRIVATE CALL') message.reply('This is not a private call text channel, please either make one or use an existing one.');
            if(message.channel.topic.split(';')[0] === 'PRIVATE CALL') {
                const voiceChannel = message.guild.channels.cache.get(message.channel.topic.split(';')[2])
                const memberPerms = voiceChannel.permissionOverwrites.filter(p => p.type === 'member')
                const rolePerms = voiceChannel.permissionOverwrites.filter(p => p.type === 'role')

                let [allow, deny] = [[], []]

                for(const [,perm] of memberPerms) {

                    if(perm.allow.serialize().VIEW_CHANNEL === true && !((await this.client.users.fetch(perm.id)).bot)) {

                        allow.push('!'+perm.id)
                    }

                    if(perm.allow.serialize().VIEW_CHANNEL === false && !((await this.client.users.fetch(perm.id)).bot)) {

                        deny.push('!'+perm.id)
                    }
                }

                for(const [id, perm] of rolePerms) {

                    if(perm.allow.serialize().VIEW_CHANNEL === true) {

                        allow.push('&'+perm.id)
                    }

                    if(perm.allow.serialize().VIEW_CHANNEL === false) {

                        deny.push('&'+perm.id)
                    }
                }

                let fieldArray = []

                if(allow.length > 0) {
                    fieldArray.push({
                        name: 'Allowed',
                        value: `- <@${allow.join(`>\n- <@`)}>`
                    })
                }
                if(deny.length > 0) {
                    fieldArray.push({
                        name: 'Denied',
                        value: `- <@${deny.join(`>\n- <@`)}>`
                    })
                }

                message.channel.send({ embed: {

                    type: 'rich',
                    title: `Users with access to ${voiceChannel.name}`,
                    fields: fieldArray,
                    color: colors.purple,
                    timestamp: new Date()
                }})
            }
        }
    }catch(e){console.log(e)}
    }
}

module.exports = ListCommand;