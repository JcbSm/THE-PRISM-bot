const { Command } = require('discord-akairo');
const Discord = require('discord.js');
const color = require('../datafiles/colors.json');

class OldestCommand extends Command {
    constructor() {
        super('oldest', {
            aliases: ['oldest'],
            description: {
                content: 'Shows a list of the oldest members in the server.',
                usage: 'oldest <page>'
            },
            args: [
                {
                    id: 'page',
                    type: 'string',
                    default: '1'
                }
            ],
            category: 'utilities'
        })
    }
    async exec(message, args) {
        
        const memberListWithBots = (await message.guild.fetchMembers()).members;
        const memberList = memberListWithBots.filter(b => !b.user.bot)
        const sortedMemberlist = memberList.sort((a, b) => b.user.createdAt - a.user.createdAt)


        let page = (args.page-1)*10
        let pageEnd = args.page*10

        let list = Array.from(sortedMemberlist.values()).map(m=>m.user.tag).reverse()

        let listPaged = list.slice(page, pageEnd)

        //message.channel.send(listPaged.map(m => `**${list.indexOf(m)+1}.** ${m}`))

        try{
        let registerRankEmbed = new Discord.RichEmbed()

            .setColor(color.purple)
            .setThumbnail(message.guild.iconURL)
            .addField(`${message.guild.name}'s join list`, listPaged.map(m => `**${list.indexOf(m)+1}.** ${m}`))
            if(list.length < pageEnd){
                registerRankEmbed.setFooter((`Page ${args.page} | ${page+1} - ${list.length} of ${list.length}`))
            } else {
                registerRankEmbed.setFooter(`Page ${args.page} | ${page+1} - ${pageEnd} of ${list.length}`)
            }

        message.channel.send(registerRankEmbed)}
        catch(err) {
            console.log(err)
            message.reply('No more members to view.')
        }
        
    }
}

module.exports = OldestCommand