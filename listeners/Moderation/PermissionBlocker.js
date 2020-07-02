const { Listener } = require('discord-akairo');
const { colors, prism } = require('../../config');
const { rgb } = require('../../functions');

class CommandBlockedListener extends Listener {
    constructor() {
        super('missingPermissions', {
            emitter: 'commandHandler',
            event: 'missingPermissions'
        });
    }

    async exec(message, command, missing) {

        try{
        
            console.log(`${message.author.username} was blocked from using ${command.id} because of ${missing}!`);

            const log = await this.client.channels.fetch(prism.guild.channelIDs.log);

            log.send("test")

            log.send({ embed: {

                type: 'rich',
                title: null,
                description: `${message.member} was blocked from using a command`,
                url: null,
                color: rgb(colors.bad),
                fields: [
                    {
                        name: 'Command',
                        value: command.id
                    },
                    {
                        name: 'Reason',
                        value: missing
                    }
                ],
                timestamp: new Date(),
                tumbnail: null,
                image: null,
                video: null,
                author: {
                    name: message.member.user.tag,
                    icon_url: message.member.user.avatarURL
                    },
                provider: null,
                footer: {
                text: `ID: ${message.member.user.id}`
                }

            }})

            message.channel.send(`${message.author}, you don\'t have permission to use that command.`)
            .then(msg => {
                msg.delete(5000)

            })

        } catch(e) { console.log(e) }

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