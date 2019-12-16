const { Listener } = require('discord-akairo');
const Discord = require('discord.js')
const color = require('../datafiles/colors.json')
const bans = require('../datafiles/softBans')

class VcBlockListener extends Listener {
    constructor() {
        super('vcBlock', {
            emitter: 'client',
            eventName: 'voiceStateUpdate'
        });
    }

    exec(oldMember, newMember) {
        
        if(newMember.voiceChannel) {

            if(newMember.voiceChannel.guild.id !== '447504770719154192') return

            if(bans.map(u => u.id).includes(newMember.id)) {

                newMember.setMute(true)

            }

        }


    }
}

module.exports = VcBlockListener;