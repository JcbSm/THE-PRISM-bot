const { Listener } = require('discord-akairo');
const Discord = require('discord.js')
const Canvas = require('canvas')
const moment = require('moment')
const color = require('../../datafiles/colors.json')
const Color = require('color')

class CanvasListener extends Listener {
    constructor() {
        super('canvas', {
            emitter: 'client',
            eventName: 'guildMemberAdd'
        })
    }
    
    async exec(member) {
     
        console.log(member.user.avatar)
    }
}

module.exports = CanvasListener;