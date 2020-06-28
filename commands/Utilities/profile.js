const { Command } = require('discord-akairo');
const moment = require('moment')
const { colors } = require('../../config');
const { rgb } = require('../../functions');

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

        try{    

            let member;

            if(!args.member) member = message.member; else member = args.member;
                
                //Own profile, if no user is given.
                let joinDate = new moment(member.joinedAt)
                let createdDate = new moment(member.user.createdAt)
                let guildName = message.guild.name

                //Calc remainder values in milleseconds
                let remainderMonthsSpent = (Date.now() - (member.joinedAt)) % (3600*1000*24*30.4375*12)
                let remainderDaysSpent = (Date.now() - (member.joinedAt)) % (3600*1000*24*30.4375)
                let remainderHoursSpent = (Date.now() - (member.joinedAt)) % (3600*1000*24)
                let remainderMinutesSpent = (Date.now() - (member.joinedAt)) % (3600*1000)

                //convert milleseconds to other things

                let yearsSpent = `${Math.floor((Date.now() - (member.joinedAt)) / (3600*1000*24*30.4375*12))} years`
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

                const memberListWithBots = (await message.guild.members.fetch());
                const memberList = memberListWithBots.filter(b => !b.user.bot)
                let sortedMemberlist = memberList.sort((a, b) => b.joinedTimestamp - a.joinedTimestamp).keyArray().reverse();
                let joinRank = (sortedMemberlist.indexOf(member.user.id)) + 1

                //Status
                const presence = member.user.presence.status

                await message.channel.send({ embed: {

                    type: 'rich',
                    title: `**${guildName} Profile**`,
                    description: `<@${member.user.id}>`,
                    color: rgb(colors.purple),
                    thumbnail: {
                        url: member.user.avatarURL()
                    },
                    footer: {
                        text: `ID: ${member.user.id}`
                    },
                    fields: [
                        {
                            name: 'Tag',
                            value: member.user.tag,
                            inline: true
                        },
                        {
                            name: 'Status',
                            value: presence,
                            inline: true
                        },                 
                        {
                            name: 'Highest Role',
                            value: member.roles.highest,
                            inline: true
                        },                        
                        {
                            name: 'Date Registered',
                            value: createdDate.format('DD MMM YYYY, HH:mm'),
                            inline: true
                        },
                        {
                            name: 'Date Joined',
                            value: joinDate.format('DD MMM YYYY, HH:mm'),
                            inline: true
                        },                        
                        {
                            name: 'Join Rank',
                            value: joinRank,
                            inline: true
                        },                        
                        {
                            name: 'Joined',
                            value: timeSpent,
                            inline: true
                        },
                    ]
                }});
        
        } catch(e) {console.log(e)}
    }
}

module.exports = ProfileCommand