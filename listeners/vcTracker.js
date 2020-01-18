const { Listener } = require('discord-akairo');
const Discord = require('discord.js')
const color = require('../datafiles/colors.json')
const bans = require('../datafiles/softBans')

class VcTrackerListener extends Listener {
    constructor() {
        super('vctracker', {
            emitter: 'client',
            eventName: 'voiceStateUpdate'
        });
    }

    async exec(oldMember, newMember) {

        if(oldMember.guild.id !== '447504770719154192') return

        const channel = this.client.channels.get('668047084666093578');

        function milliToTime(milli)
{
      var milliseconds = milli % 1000;
      var seconds = Math.floor((milli / 1000) % 60);
      var minutes = Math.floor((milli / (60 * 1000)) % 60);
      var hours = Math.floor((milli / (3600 * 1000)) % 60);

      return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
}
        
        if(newMember.voiceChannel && !oldMember.voiceChannel) {

            if(newMember.voiceChannel.id === '667837515759222786') {

                channel.send(`> ${newMember} joined the channel`)
    
            }

        }

        if(!newMember.voiceChannel) {

            if(oldMember.voiceChannel.id === '667837515759222786') {

                channel.fetchMessages().then(messages => {

                    const lastmessage = messages.filter(m => m.content.startsWith(`> ${newMember} joined`));
                    const timeSpent = milliToTime(Date.now() - lastmessage.first().createdTimestamp)

                    channel.send(`=========================\n${newMember} left the channel after \`\`\`${timeSpent}\`\`\`=========================`)
                    .then(channel.send("."))

                })

            }

        }

        if(newMember.voiceChannel.id !== oldMember.voiceChannel.id && newMember.voiceChannel) {

            if(oldMember.voiceChannel.id === '667837515759222786') {

                channel.fetchMessages().then(messages => {

                    const lastmessage = messages.filter(m => m.content.startsWith(`> ${newMember} joined`));
                    const timeSpent = milliToTime(Date.now() - lastmessage.first().createdTimestamp)

                    channel.send(`=========================\n${newMember} left the channel after \`\`\`${timeSpent}\`\`\`=========================`)
                    .then(channel.send("."))

                })



            }

            if(newMember.voiceChannel.id === '667837515759222786') {

                channel.send(`> ${newMember} joined the channel`)

            }

        }

    }
}

module.exports = VcTrackerListener;