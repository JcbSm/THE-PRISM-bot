const { Command } = require('discord-akairo');
const Discord = require('discord.js');
const color = require('../colors.json');

class JoinCommand extends Command {
    constructor() {
        super('joinlist', {
            aliases: ['join-list', 'joinlist'],
            description: {
                content: 'Shows a list of members in order of their join dates.',
                usage: 'joinrank <page>'
            },
            args: [
                {
                    id: 'page',
                    type: 'string',
                    default: '1'
                }
            ]
        })
    }
    exec(message, args) {
        let memberList = message.guild.members
        let sortedMemberlist = memberList.sort((a, b) => b.joinedAt - a.joinedAt)

        let page = (args.page-1)*10
        let pageEnd = args.page*10

        let list = Array.from(sortedMemberlist.values()).map(m=>m.user.tag).reverse()

        let listPaged = list.slice(page, pageEnd)

        //message.channel.send(listPaged.map(m => `**${list.indexOf(m)+1}.** ${m}`))

        try{
        let joinRankEmbed = new Discord.RichEmbed()

            .setColor(color.purple)
            .setThumbnail(message.guild.iconURL)
            .addField(`${message.guild.name}'s join list`, listPaged.map(m => `**${list.indexOf(m)+1}.** ${m}`))
            if(list.length < pageEnd){
                joinRankEmbed.setFooter((`Page ${args.page} | ${page+1} - ${list.length} of ${list.length}`))
            } else {
                joinRankEmbed.setFooter(`Page ${args.page} | ${page+1} - ${pageEnd} of ${list.length}`)
            }

        message.channel.send(joinRankEmbed)}
        catch(err) {
            message.reply('No more members to view.')
        }
        
    }
}

module.exports = JoinCommand