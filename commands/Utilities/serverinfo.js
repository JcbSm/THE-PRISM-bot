const { Command } = require('discord-akairo');
const Discord = require('discord.js');
const moment = require('moment')
const color = require('../../datafiles/colors.json')

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

        const guildInfo = await message.guild.fetchMembers()

        //Calculating Member numbers.
        const guildMembers = guildInfo.members

        const membersSize = guildMembers.size;
        const botsSize = guildMembers.filter(b => b.user.bot).size
        const humanSize = membersSize - botsSize
        const onlineSize = guildMembers.filter(u => u.presence.status === 'online').size

        //Calculating owner
        const guildOwner = message.guild.owner.user.tag

        //Calculate server time

        const guildCreated = message.guild.createdAt
        const guildCreatedDate = new moment(message.guild.createdAt).format('DD MMM YYYY')

        //Calc remainder values in milleseconds
        let remainderMonthsSpent = (Date.now() - (guildCreated)) % (3600*1000*24*30.4375*12)
        let remainderDaysSpent = (Date.now() - (guildCreated)) % (3600*1000*24*30.4375)
        let remainderHoursSpent = (Date.now() - (guildCreated)) % (3600*1000*24)
        let remainderMinutesSpent = (Date.now() - (guildCreated)) % (3600*1000)

        //convert milleseconds to other things

        let yearsSpent = `${Math.floor((Date.now() - (guildCreated)) / (3600*1000*24*30.4375*12))} years`
        let monthsSpent = `${Math.floor(remainderMonthsSpent / (3600*1000*24*30.4375))} months`
        let daysSpent = `${Math.floor(remainderDaysSpent / (3600*1000*24))} days`
        let hoursSpent = `${Math.floor(remainderHoursSpent / (3600*1000))} hours`
        let minutesSpent = `${Math.floor(remainderMinutesSpent / (1000*60))} minutes`

        if(yearsSpent == `1 years`) {
            yearsSpent = '1 year'
        }

        if(monthsSpent == '1 months') {
            monthsSpent = '1 month'
        }

        if(daysSpent == '1 days') {
            daysSpent = '1 day'
        }

        if(hoursSpent == '1 hours') {
            hoursSpent = '1 hour'
        }

        if(minutesSpent == '1 minutes') {
            minutesSpent = '1 minute'
        }

        let timeSpent = ''

            if(hoursSpent === '0 hours' && daysSpent === '0 days' && monthsSpent === '0 months' && yearsSpent === '0 years') {
                timeSpent = minutesSpent + 'ago.'
            } else if(daysSpent === '0 days' && monthsSpent === '0 months' && yearsSpent === '0 years') {
                timeSpent = `${hoursSpent}, ${minutesSpent} ago.`
            } else if(monthsSpent === '0 months' && yearsSpent === '0 years') {
                timeSpent = `${daysSpent}, ${hoursSpent} ago.`
            } else if(yearsSpent === '0 years') {
                timeSpent = `${monthsSpent}, ${daysSpent}, ${hoursSpent} ago.`
            } else {
                timeSpent = `${yearsSpent}, ${monthsSpent}, ${daysSpent} ago.`
            }

        //Region
        const guildRegion = message.guild.region

        //Channels
        const guildChannels = guildInfo.channels 

        const textChannelSize = guildChannels.filter(c => c.type === 'text').size
        const voiceChannelSize = guildChannels.filter(c => c.type === 'voice').size
        const categoriesSize = guildChannels.filter(c => c.type === 'category').size

        //Emojis
        const eomjiSize = guildInfo.emojis.size

        //Roles
        const roleSize = guildInfo.roles.size

        //Verified
        let isVerified = ''
            if(message.guild.verified) {
                isVerified = 'Yes'
            } else {
                isVerified = 'No'
            }
       
        //Embed
        message.channel.send(new Discord.RichEmbed()
            .setAuthor(message.guild.name, message.guild.iconURL)
            .setColor(color.purple)
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
            .addField('Created', timeSpent)
        )
    }
}

module.exports = ServerInfoCommand;