const { Command } = require('discord-akairo');
const Discord = require('discord.js');
const mee6calc  = 'http://mee6.github.io/Mee6-documentation/mee6calc/';
const color = require('../datafiles/colors.json')
const mee6avatar = 'https://cdn.discordapp.com/avatars/159985870458322944/b50adff099924dd5e6b72d13f77eb9d7.png?size=2048'

class LevelCommand extends Command {
    constructor() {
        super('mee6level', {
            aliases: ['mee6level'],
            description: {
                content: 'Calculates the amount of messages required to get to get to a certain mee6 level. Current XP is displayed on the server leaderboard (!levels).',
                usage: 'mee6level <required level> <current XP>'
            },
            category: 'utilities',
            args: [
                {
                    id: 'level',
                    type: 'number'
                },
                {
                    id: 'current',
                    type: 'number'
                }
            ]
        })
    }
    
    exec(message, args) {

        let currentXP = args.current
        let x = args.level

        console.log(x)

        let levelRequiredXP = Math.round((5/6)*x*(2*(Math.pow(x,2))+27*x+91))

        console.log(levelRequiredXP)

        let requiredXP = levelRequiredXP - currentXP

        if(requiredXP < 0) return message.reply('You\'ve already passed that level')

        const avMessages = Math.round(requiredXP / 20)
        const minMessages = Math.round(requiredXP / 25)
        const maxMessages = Math.round(requiredXP /15)

        console.log(avMessages, maxMessages, minMessages)

        message.channel.send(new Discord.RichEmbed()
            
            .setTitle('MEE6 level calculator')
            .setDescription(`Credit to the original creator, check that out [here](${mee6calc})`)
            .setColor(color.purple)
            .setThumbnail(mee6avatar)
            .addField('Required XP:', requiredXP, true)
            .addField('Average Messages', avMessages, true)
            .addField('Maximum Messages', maxMessages,true)
            .addField('Minimum Messages', minMessages, true)
            .setFooter('NOTE: You can only earn XP once per minute.')

        )
    }
}

module.exports = LevelCommand