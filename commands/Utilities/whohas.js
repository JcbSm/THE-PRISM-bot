const { Command } = require('discord-akairo');
const Discord = require('discord.js');
const color = require('../../datafiles/colors.json');

class WhoHasCommand extends Command {
    constructor() {
        super('whohas', {
            aliases: ['whohas'],
            description: {
                content: 'Shows a list of members with a certain role.',
                usage: 'whohas <role> <page>'
            },
            category: 'utilities',
            args: [
                {
                    id: 'role',
                    type: 'string'
                },
                {
                    id: 'page',
                    type: 'string',
                    default: '1'
                }
            ]
        })
    }

    async exec(message, args) {

        const role = (await message.guild.fetchMembers()).roles.find(r => r.name.toLowerCase().includes(args.role.toLowerCase()))
        if(!role) return message.reply('No role found.')

        let sendMessage = await message.channel.send(`***Calculating...***`)

        const roleMembers = role.members.sort(function(a, b) {
            var nameA = a.user.username.toUpperCase();
            var nameB = b.user.username.toUpperCase();
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
          
            // names must be equal
            return 0;
          });

        let page = (args.page-1)*10
        let pageEnd = args.page*10

        let list = Array.from(roleMembers.values()).map(m=>m.user.tag)

        let listPaged = list.slice(page, pageEnd)

        try{
        let whoHasEmbed = new Discord.RichEmbed()

            .setColor(color.purple)
            .setThumbnail(message.guild.iconURL)
            .addField(`Members with "${role.name}"`, listPaged.map(m => `**${list.indexOf(m)+1}.** ${m}`))
            if(list.length < pageEnd){
                whoHasEmbed.setFooter((`Page ${args.page} | ${page+1} - ${list.length} of ${list.length}`))
            } else {
                whoHasEmbed.setFooter(`Page ${args.page} | ${page+1} - ${pageEnd} of ${list.length}`)
            }

        message.channel.send(whoHasEmbed).then(
            sendMessage.delete()
        )}
        catch(err) {
            sendMessage.delete()
            message.reply('No more members to view')
        }
    }
}

module.exports = WhoHasCommand;