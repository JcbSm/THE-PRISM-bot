const { Listener } = require('discord-akairo');
const Discord = require('discord.js')
const moment = require('moment')
const color = require('../../datafiles/colors.json')
const Color = require('color')

class GuildMemberAddListener extends Listener {
    constructor() {
        super('guildMemberAdd', {
            emitter: 'client',
            eventName: 'guildMemberAdd'
        })
    }
    
    async exec(member) {

        const guild = member.guild;
        const log = this.client.channels.get('669653850902233098');
        const time = moment(Date.now()).format('DD MMM YYYY, HH:mm')
        
        if(!guild) return;
        if(guild.id !== '447504770719154192') return;

        function rgb(inputColor) {
            return Color(inputColor).rgbNumber()
        }

        await log.send({embed: {
            
            type: 'rich',
            title: null,
            description: `**${member} joined the server**`,
            url: null,
            color: rgb(color.good),
            fields: [],
            timestamp: new Date(),
            tumbnail: null,
            image: null,
            video: null,
            author: {
                name: member.user.tag,
                icon_url: member.user.avatarURL
                },
            provider: null,
            footer: {
            text: `ID: ${member.user.id}`
            }

        }})
    }
}

module.exports = GuildMemberAddListener;