const { Command } = require('discord-akairo');
const Discord = require('discord.js')
const moment = require('moment')
const { colors } = require('../../config');
const { rgb, since } = require('../../functions');

class ServerInfoCommand extends Command {
    constructor() {
        super('serverinfo', {
            aliases: ['serverinfo'],
            description: {
                content: 'Views the information about the server.',
                usage: 'serverinfo'
            },
            category: 'utilities',
            channelRestriction: 'guild'
        })
    }

    async exec(message) {

        try{

        const guildInfo = await message.guild

        //Calculating Member numbers.
        const guildMembers = await guildInfo.members.fetch()

        const membersSize = guildMembers.size;
        const botsSize = guildMembers.filter(b => b.user.bot).size
        const humanSize = membersSize - botsSize
        const onlineSize = guildMembers.filter(u => u.presence.status === 'online').size
        const guildOwner = message.guild.owner.user.tag
        const guildCreatedDate = new moment(message.guild.createdAt).format('DD MMM YYYY')

        //Region
        const guildRegion = message.guild.region

        //Channels
        const guildChannels = guildInfo.channels.cache 

        const textChannelSize = guildChannels.filter(c => c.type === 'text').size
        const voiceChannelSize = guildChannels.filter(c => c.type === 'voice').size
        const categoriesSize = guildChannels.filter(c => c.type === 'category').size

        //Emojis
        const eomjiSize = guildInfo.emojis.cache.size

        //Roles
        const roleSize = guildInfo.roles.cache.size

        //Verified
        let isVerified = ''
            if(message.guild.verified) {
                isVerified = 'Yes'
            } else {
                isVerified = 'No'
            }
       
        //Embed
        message.channel.send(new Discord.MessageEmbed()
            .setAuthor(message.guild.name, message.guild.iconURL)
            .setColor(colors.purple)
            .setFooter(`ID: ${message.guild.id} | Created: ${guildCreatedDate}`)
            .addField('Owner', guildOwner, true)
            .addField('Region', guildRegion, true)
            .addField('Members', membersSize,true)
            .addField('Online', onlineSize, true)
            .addField('Humans', humanSize, true)
            .addField('Bots', botsSize, true)
            .addField('Channel categories', categoriesSize, true)
            .addField('Text Channels', textChannelSize, true)
            .addField('Voice Channels', voiceChannelSize, true)
            .addField('Emojis', eomjiSize, true)
            .addField('Roles', roleSize, true)
            .addField('Verified', isVerified, true)
            .addField('Created', since(guildInfo.createdAt, 3))
        )
    }catch(e){console.log(e)}
    }
}

module.exports = ServerInfoCommand;