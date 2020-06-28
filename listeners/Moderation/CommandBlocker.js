const { Listener } = require('discord-akairo');
const config = require('../../config');
const { rgb } = require('../../functions');

class CommandBlockedListener extends Listener {
    constructor() {
        super('commandBlocked', {
            emitter: 'commandHandler',
            event: 'commandBlocked'
        });
    }

    async exec(message, command, reason) {
        
        console.log(`${message.author.username} was blocked from using ${command.id} because of ${reason}!`);

        message.channel.send(`${message.author}, you don\'t have permission to use that command.`)
        .then(msg => {
            msg.delete(5000)

        })

        //let reportsChannel = await this.client.channels.fetch('567844048510124052')

        /*let reportEmbed = new Discord.RichEmbed() 

            .setTitle('**User blocked**')
            .setColor(color.purple)
            .addField('User', message.author.tag,true)
            .addField('Command', command.id, true)
            .addField('Reason', reason, true)
            .addField('Server', message.guild + ', ID: ' + message.guild.id)
            .setFooter(Date())

        reportsChannel.send(reportEmbed)*/
    };
};

module.exports = CommandBlockedListener;