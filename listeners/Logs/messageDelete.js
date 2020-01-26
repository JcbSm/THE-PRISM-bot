const { Listener } = require('discord-akairo');
const Discord = require('discord.js')
const moment = require('moment')
const color = require('../../datafiles/colors.json')
const Color = require('color')

class MessageDeleteListener extends Listener {
    constructor() {
        super('messageDelete', {
            emitter: 'client',
            eventName: 'messageDelete'
        })
    }
    
    async exec(message) {
try{
        const guild = message.guild
        const log = this.client.channels.get('669653850902233098');
        const time = moment(Date.now()).format('DD MMM YYYY, HH:mm')
        
        if(!guild) return;
        if(guild.id !== '447504770719154192') return;
        if(message.author.bot) return;

        function rgb(inputColor) {
            return Color(inputColor).rgbNumber()
        }

        const fetchedLogs = await guild.fetchAuditLogs( {
            limit: 1,
            type: 'MESSAGE_DELETE',
        });
        const deletionLog = fetchedLogs.entries.first();

        let logMessage;

        if(!deletionLog) {
            logMessage = `**${message.author}'s message was deleted in ${message.channel}**`
        }

        const { reason, executor, target } = deletionLog;

        if(target.id === message.author.id) {
            logMessage = `**${message.author}'s message was deleted in ${message.channel} by ${executor}**`
        } else {
            logMessage = `**${message.author}'s message was deleted in ${message.channel}**`
        }

        if(reason) {
            logMessage = logMessage + 'for ' + reason
        }

        await log.send({embed: {
            
            type: 'rich',
            title: null,
            description: logMessage,
            url: null,
            color: rgb(color.bad),
            fields: [
                {
                    name: 'Message',
                    value: message.content
                },
            ],
            timestamp: new Date(),
            tumbnail: null,
            image: null,
            video: null,
            author: {
                name: message.member.user.tag,
                icon_url: message.member.user.avatarURL
                },
            provider: null,
            footer: {
            text: `ID: ${message.member.user.id}`
            }

        }})
    }catch(error){console.log(error)}
    }
}

module.exports = MessageDeleteListener;