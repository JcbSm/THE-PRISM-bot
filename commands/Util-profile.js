const { Command } = require('discord-akairo');
const Discord = require('discord.js')
const moment = require('moment')
const color = require('../datafiles/colors.json')

class ProfileCommand extends Command {
    constructor() {
        super('profile', {
            aliases: ['profile'],
            channelRestriction: 'guild',
            args: [
                {
                    id: 'member',
                    type: 'member'
                }
            ],
            description: {
                content: 'View the profile of a user for the server, if no user is given, it will display your own.',
                usage: `profile <user>`
            },
            category: 'utilities'
        });
    }

    async exec(message, args) {

        

        if(!args.member) {
            
            //Own profile, if no user is given.
            let joinDate = new moment(message.member.joinedAt)
            let createdDate = new moment(message.author.createdAt)
            let guildName = message.guild.name

            //Calc remainder values in milleseconds
            let remainderMonthsSpent = (Date.now() - (message.member.joinedAt)) % (3600*1000*24*30.4375*12)
            let remainderDaysSpent = (Date.now() - (message.member.joinedAt)) % (3600*1000*24*30.4375)
            let remainderHoursSpent = (Date.now() - (message.member.joinedAt)) % (3600*1000*24)
            let remainderMinutesSpent = (Date.now() - (message.member.joinedAt)) % (3600*1000)

            //convert milleseconds to other things

            let yearsSpent = `${Math.floor((Date.now() - (message.member.joinedAt)) / (3600*1000*24*30.4375*12))} years`
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

            //Join rank calculations

            const memberListWithBots = (await message.guild.fetchMembers()).members;
            const memberList = memberListWithBots.filter(b => !b.user.bot)
            let sortedMemberlist = memberList.sort((a, b) => b.joinedTimestamp - a.joinedTimestamp).keyArray().reverse()
            let joinRank = (sortedMemberlist.indexOf(message.author.id))

            //Status
            const presence = message.author.presence.status

            let profileEmbed0 = new Discord.RichEmbed()

                .setTitle(`**${guildName} Profile**`)
                .setAuthor(message.author.tag, message.author.avatarURL)
                .setColor(color.purple)
                .setThumbnail(message.author.avatarURL)
                .setFooter(`ID: ${message.author.id}`)
                .addField('Name', message.author.username, true)
                .addField('Status', presence, true)
                .addField('Highest Role', message.member.highestRole, true)
                .addField('Date Registered', createdDate.format('DD MMM YYYY, hh:mm A'), true)
                .addField('Date Joined', joinDate.format('DD MMM YYYY, hh:mm A'), true)
                .addField('Join rank', joinRank + 1, true)
                .addField('Joined', timeSpent, true)
            
            message.channel.send(profileEmbed0)
            
        } else {

            //If user is given in second argument
            let joinDate = new moment(args.member.joinedAt)
            let createdDate = new moment(args.member.user.createdAt)
            let guildName = message.guild.name

            //Calc remainder values in milleseconds
            let remainderMonthsSpent = (Date.now() - (args.member.joinedAt)) % (3600*1000*24*30.4375*12)
            let remainderDaysSpent = (Date.now() - (args.member.joinedAt)) % (3600*1000*24*30.4375)
            let remainderHoursSpent = (Date.now() - (args.member.joinedAt)) % (3600*1000*24)
            let remainderMinutesSpent = (Date.now() - (args.member.joinedAt)) % (3600*1000)

            //convert milleseconds to other things
            let yearsSpent = `${Math.floor((Date.now() - (args.member.joinedAt)) / (3600*1000*24*30.4375*12))} years`
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

            //Join rank calculations

            const memberListWithBots = (await message.guild.fetchMembers()).members;
            const memberList = memberListWithBots.filter(b => !b.user.bot)
            let sortedMemberlist = memberList.sort((a, b) => b.joinedTimestamp - a.joinedTimestamp).keyArray().reverse()
            let joinRank = (sortedMemberlist.indexOf(args.member.id))

            //Presence
            const presence = args.member.presence.status
            
            console.log(presence)

            let profileEmbed1 = new Discord.RichEmbed()
                .setTitle(`**${guildName} Profile**`)
                .setAuthor(args.member.user.tag, args.member.user.avatarURL)
                .setColor(color.purple)
                .setThumbnail(args.member.user.avatarURL)
                .setFooter(`ID: ${args.member.id}`)
                .addField('Name', args.member.user.username, true)
                .addField('Status', presence, true)
                .addField('Highest Role', args.member.highestRole, true)
                .addField('Date Registered', createdDate.format('DD MMM YYYY, hh:mm'), true)
                .addField('Date Joined', joinDate.format('DD MMM YYYY, hh:mm'), true)
                .addField('Join rank', joinRank + 1, true)
                .addField('Joined', timeSpent)


            message.channel.send(profileEmbed1)
        }
    }
}

module.exports = ProfileCommand