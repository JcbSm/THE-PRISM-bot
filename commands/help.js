const { Command } = require('discord-akairo');
const Discord = require('discord.js');
const color = require('../colors.json')
const config = require('../config.json')

class HelpCommand extends Command {
    constructor() {
        super('help', {
            aliases: ['help'],
            args: [
                {
                    id: 'command',
                    type: 'command'
                }
            ],
            description: {
                content: 'Shows help for commands, or shows a list of commands.',
                usage: 'help <command>'
            }
        })
    }
    
    exec(message, args) {

        if(!args.command) return message.reply('Couldn\'t find that command.')
        
        let helpEmbed = new Discord.RichEmbed()

            .setTitle(`${config.prefix} ${args.command}`.toUpperCase())
            .setColor(color.purple)
            .addField('Description', this.handler.modules.get(`${args.command}`).description.content)
            .addField('Usage', config.prefix + this.handler.modules.get(`${args.command}`).description.usage)
        
        message.channel.send(helpEmbed);
    }
}
module.exports = HelpCommand;