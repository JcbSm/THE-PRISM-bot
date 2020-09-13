const { Command } = require('discord-akairo');
const { colors, prefix } = require('../config');
const { rgb } = require('../functions');

class HelpCommand extends Command {
    constructor() {
        super('help', {
            aliases: ['help'],
            args: [
                {
                    id: 'command',
                    type: 'string',
                    match: 'rest'
                }
            ],
            description: {
                content: 'Shows help for commands, or shows a list of commands.',
                usage: 'help <command>'
            },
        })
    }
    
    async exec(message, args) {

        try{

            let categories = this.handler.categories.filter(c => c.id !== 'default').sort((a, b) => a.size - b.size)
            let commands = this.handler.modules

            if(!args.command) {

                let fieldArray = [];

                for(const [id, category] of categories) {

                    fieldArray.push({
                        name: id.toUpperCase(),
                        value: `- ${category.map(c => c.id).join("\n - ")}\n---------------`,
                        inline: false
                    })
                }

                message.author.send({ embed: {

                    type: 'rich',
                    title: `COMMANDS`,
                    fields: fieldArray,
                    color: colors.purple,
                    thumbnail: {
                        url: this.client.user.avatarURL()
                    },
                    author: {
                        name: this.client.user.username,
                        icon_url: this.client.user.avatarURL()
                        },
                    footer: {
                        text: `Type ${prefix}help <command> for more information.`
                    }

                }})

            } else if(args.command) {

                if(categories.map(c => c.id.toLowerCase()).includes(args.command.toLowerCase())) {

                    let list = categories.filter(c => c.id.toLowerCase() === args.command.toLowerCase()).map(c => `**${c.id.toLocaleUpperCase()}:** \n- ${c.keyArray().join('\n- ')}\n`)
                    message.channel.send({ embed: {

                        type: 'rich',
                        color: rgb(colors.purple),
                        fields: [
                            {
                                name: '**Commands**',
                                value: list
                            }
                        ],
                        thumbnail: {
                            url: this.client.user.avatarURL()
                        },
                        author: {
                            name: this.client.user.username,
                            icon_url: this.client.user.avatarURL()
                            },
                        footer: {
                            text: `Type ${prefix}help <command> for more information.`
                        }
                    }})
                }

                else if(commands.map(c => c.id.toLowerCase()).includes(args.command.toLowerCase())) {

                    let command = commands.find(c => c.id.toLowerCase() === args.command.toLowerCase())

                    message.channel.send({ embed: {

                        title: `${prefix} ${command.id}`.toLocaleUpperCase(),
                        color: rgb(colors.purple),
                        fields: [
                            {
                                name: 'Description',
                                value: command.description.content,
                            },
                            {
                                name: 'Usage',
                                value: `${prefix}${command.description.usage}`
                            },
                            {
                                name: 'Aliases',
                                value: command.aliases
                            }
                        ]
                    }})

                } else {

                    message.reply(`No commands or categories found, check ${prefix}help to view them all.`)
                }
            }

        } catch(e) {console.log(e)}
    }
}
module.exports = HelpCommand;