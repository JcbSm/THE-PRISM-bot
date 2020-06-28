const { Command } = require('discord-akairo');
const { colors } = require('../../config')
const { rgb } = require('../../functions')

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
                    type: 'role'
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

        try{

            const role = args.role
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

                let footerText;
                if(list.length < pageEnd){
                    footerText = `Page ${args.page} | ${page+1} - ${list.length} of ${list.length}`
                } else {
                    footerText = `Page ${args.page} | ${page+1} - ${pageEnd} of ${list.length}`
                }

                message.channel.send({ embed: {

                    type: 'rich',
                    thumbnail: {
                        url: message.guild.iconURL,
                    },
                    fields: [
                        {
                            name: `Members with "${role.name}"`,
                            value: listPaged.map(m => `**${list.indexOf(m)+1}.** ${m}`)
                        }
                    ],
                    footer: {
                        text: footerText
                    },
                    color: rgb(colors.purple)

                }}).then(
                    sendMessage.delete()
                )}
            catch(err) {
                sendMessage.delete()
                message.reply("No members to view.")
            }
        } catch(e) {console.log(e)}
    }
}

module.exports = WhoHasCommand;