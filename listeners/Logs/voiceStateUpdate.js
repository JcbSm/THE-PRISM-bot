const { Listener } = require('discord-akairo');
const Discord = require('discord.js')
const color = require('../../datafiles/colors.json')
const bans = require('../../datafiles/softBans')

class voiceStateUpdateListener extends Listener {
    constructor() {
        super('voiceStateUpdate', {
            emitter: 'client',
            eventName: 'voiceStateUpdate'
        });
    }

    async exec(oldMember, newMember) {

        if(oldMember.guild.id !== '447504770719154192') return
        
        //Softban
        if(newMember.voiceChannel) {

            if(bans.map(u => u.id).includes(newMember.id)) {

                await newMember.setMute(true)
                
            }
        } 
    }
}

module.exports = voiceStateUpdateListener;