const { Listener } = require('discord-akairo');
const config = require('../../config');
const { rgb } = require('../../functions');

class GuildMemberRemoveListener extends Listener {
    constructor() {
        super('guildMemberRemove', {
            emitter: 'client',
            event: 'guildMemberRemove'
        })
    }
    
    async exec(member) {

        const guild = member.guild;
        const log = await this.client.channels.fetch(config.prism.guild.channelIDs.log);
        const time = moment(Date.now()).format('DD MMM YYYY, HH:mm')
        
        if(!guild) return;
        if(guild.id !== config.prism.guild.id) return;

        (await this.client.channels.fetch('447702094430863360')).send(`***${member.user.tag} left the server.***`)

        await log.send({embed: {
            
            type: 'rich',
            title: null,
            description: `**${member} left the server**`,
            url: null,
            color: rgb(config.colors.bad),
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

module.exports = GuildMemberRemoveListener;