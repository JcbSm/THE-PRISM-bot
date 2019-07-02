const { Command } = require('discord-akairo');
const Discord = require('discord.js');
const color = require('../datafiles/colors.json')
const config = require('../config.json')

class HelpCommand extends Command {
    constructor() {
        super('help', {
            aliases: ['help'],
            args: [
                {
                    id: 'command',
                    type: 'string'
                }
            ],
            description: {
                content: 'Shows help for commands, or shows a list of commands.',
                usage: 'help <command>'
            },
            category: 'help'
        })
    }
    
    exec(message, args) {

        if(!args.command) {

            let categories = this.handler.categories.filter(c => c.id !== 'default')

            let list = categories.map(c => `**${c.id.toLocaleUpperCase()}:** \n- ${c.keyArray().join('\n- ')}\n`)
    
            let helpEmbed = new Discord.RichEmbed() 
    
                .setColor(color.purple)
                .setAuthor(this.client.user.username, this.client.user.avatarURL)
                .setThumbnail(this.client.user.avatarURL)
                .setFooter(`Type ${config.prefix}help <command> for more information.`)
                .addField('**Commands**', list)
            
            message.author.send(helpEmbed)

        } else if(args.command === 'fun'){

            let categories = this.handler.categories.filter(c => c.id === 'fun')

            let list = categories.map(c => `**${c.id.toLocaleUpperCase()}:** \n- ${c.keyArray().join('\n- ')}\n`)
    
            let helpEmbed = new Discord.RichEmbed() 
    
                .setColor(color.purple)
                .setAuthor(this.client.user.username, this.client.user.avatarURL)
                .setThumbnail(this.client.user.avatarURL)
                .setFooter(`Type ${config.prefix}help <command> for more information.`)
                .addField('**Commands**', list)
            
            message.channel.send(helpEmbed)

        } else if(args.command === 'moderation'){

            let categories = this.handler.categories.filter(c => c.id === 'moderation')

            let list = categories.map(c => `**${c.id.toLocaleUpperCase()}:** \n- ${c.keyArray().join('\n- ')}\n`)
    
            let helpEmbed = new Discord.RichEmbed() 
    
                .setColor(color.purple)
                .setAuthor(this.client.user.username, this.client.user.avatarURL)
                .setThumbnail(this.client.user.avatarURL)
                .setFooter(`Type ${config.prefix}help <command> for more information.`)
                .addField('**Commands**', list)
            
            message.channel.send(helpEmbed)

        } else if(args.command === 'utilities'){

            let categories = this.handler.categories.filter(c => c.id === 'utilities')

            let list = categories.map(c => `**${c.id.toLocaleUpperCase()}:** \n- ${c.keyArray().join('\n- ')}\n`)
    
            let helpEmbed = new Discord.RichEmbed() 
    
                .setColor(color.purple)
                .setAuthor(this.client.user.username, this.client.user.avatarURL)
                .setThumbnail(this.client.user.avatarURL)
                .setFooter(`Type ${config.prefix}help <command> for more information.`)
                .addField('**Commands**', list)
            
            message.channel.send(helpEmbed)
            
        } else {
        
            let helpEmbed = new Discord.RichEmbed()

                .setTitle(`${config.prefix} ${args.command}`.toUpperCase())
                .setColor(color.purple)
                .addField('Description', this.handler.modules.get(`${args.command}`).description.content)
                .addField('Usage', config.prefix + this.handler.modules.get(`${args.command}`).description.usage)
                if(this.handler.modules.get(`${args.command}`).aliases.length > 1){
                    helpEmbed.addField('Aliases', this.handler.modules.get(`${args.command}`).aliases)
                }
            
            message.channel.send(helpEmbed);
        }
    }
}
module.exports = HelpCommand;