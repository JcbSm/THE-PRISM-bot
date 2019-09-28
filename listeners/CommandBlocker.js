const { Listener } = require('discord-akairo');
const color = require('../datafiles/colors.json')
const Discord = require('discord.js')

class CommandBlockedListener extends Listener {
    constructor() {
        super('commandBlocked', {
            emitter: 'commandHandler',
            eventName: 'commandBlocked'
        })
    }

    exec(message, command, reason) {
        console.log(`${message.author.tag} was blocked form using \'${command.id}\' because of \'${reason}\'!`)

        message.channel.send(`${message.author}, you don\'t have permission to use that command.`)
        .then(msg => {
            msg.delete(5000)

        })

        let reportsChannel = this.client.channels.get('567844048510124052')

        let reportEmbed = new Discord.RichEmbed() 

            .setTitle('**User blocked**')
            .setColor(color.purple)
            .addField('User', message.author.tag,true)
            .addField('Command', command.id, true)
            .addField('Reason', reason, true)
            .addField('Server', message.guild + ', ID: ' + message.guild.id)
            .setFooter(Date())

        reportsChannel.send(reportEmbed)
    };
};

module.exports = CommandBlockedListener;