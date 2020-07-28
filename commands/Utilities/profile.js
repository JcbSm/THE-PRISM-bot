const { Command } = require('discord-akairo');
const moment = require('moment')
const { colors } = require('../../config');
const { rgb, since } = require('../../functions');

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

                //Join rank calculations
                const memberListWithBots = (await message.guild.members.fetch());
                const memberList = memberListWithBots.filter(b => !b.user.bot)
                const sortedMemberlist = memberList.sort((a, b) => b.joinedTimestamp - a.joinedTimestamp).keyArray().reverse();
                const joinRank = (sortedMemberlist.indexOf(member.user.id)) + 1

                await message.channel.send({ embed: {

                    type: 'rich',
                    title: `**${message.guild.name} Profile**`,
                    description: `<@${member.user.id}>`,
                    color: colors.purple,
                    thumbnail: {
                        url: member.user.avatarURL({size: 1024})
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
                            value: member.user.presence.status,
                            inline: true
                        },                 
                        {
                            name: 'Highest Role',
                            value: member.roles.cache.filter(r => !r.name.includes('═')).sort((a, b) => a.rawPosition - b.rawPosition).last(),
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
                            value: `${since(member.joinedAt, 3)} ago.`,
                            inline: true
                        },
                    ]
                }});
        
        } catch(e) {console.log(e)}
    }
}

module.exports = ProfileCommand