const Discord = require('discord.js');
const color = require('../colors.json');
const { Command } = require('discord-akairo');

class JcbSmCommand extends Command {
    constructor() {
        super('jcbsm', {
            aliases: ['JcbSm'],
            description: {
                content: 'Show some information about JcbSm',
                usage: 'JcbSm'
            },
        })
    }

    exec(message) {
        
        let JcbSmEmbed = new Discord.RichEmbed()

        .setTitle('My Music:')
        .setColor(color.purple)
        .setThumbnail(message.author.avatarURL)
        .addField('SPOTIFY:', 'https://open.spotify.com/artist/5GvMvwDmvTY9IOsEjZvceQ?si=mPJwFZ_KQsavXWG0Kxp6pg')
        .addField('APPLE MUSIC:', 'https://itunes.apple.com/gb/artist/jcbsm/1454955947')
        .addField('SOUNDCLOUD:', 'https://soundcloud.com/jcbsm')
        .addField('GOOGLE PLAY MUSIC:', ' https://play.google.com/music/preview/Anl6bkkp2bzneh2cl4jzrmrh3zi?play=1&u=0')
        .addField('DEEZER:', 'https://www.deezer.com/en/artist/60750472')

        message.channel.send(JcbSmEmbed)
    }
}

module.exports = JcbSmCommand;