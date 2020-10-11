const { Command } = require('discord-akairo');
const { colors } = require('../../../config')

class UserLimitCommand extends Command {
    constructor() {
        super('permcall', {
            aliases: ['permcall', 'perm'],
            description: {
                content: 'Makes the channel not disapear',
                usage: 'permcall'
            },
            category: 'calls',
        })
    }

    async exec(message, args) {
        try{        
        
        if(message.guild.id === '447504770719154192' || message.guild.id === '742026925156860026' || message.guild.id === '361569079514890252') {

            const guild = message.guild
            let arr, value;

            if(message.channel.topic.split(';')[0] !== 'PRIVATE CALL') return message.reply('This is not a private call text channel, please either make one or use an existing one.');
            if(message.channel.topic.split(';')[0] === 'PRIVATE CALL') {

                if(message.channel.topic.split(";")[3] === 'false') {

                    value = true
                    arr = message.channel.topic.split(";")
                    arr[3] = 'true'
                    message.channel.setTopic(arr.join(";"))

                } else if(message.channel.topic.split(";")[3] === 'true') {

                    value = false
                    arr = message.channel.topic.split(";")
                    arr[3] = 'false'
                    message.channel.setTopic(arr.join(";"))
                }


                message.channel.send({ embed: {

                    type: 'rich',
                    title: `Updated ${message.channel.name}`,
                    description: `Toggled Persistence: **${value}**`,
                    color: colors.purple,
                    timestamp: new Date()
                }})
            }

        }
    
    }catch(error){console.log(error)}

    }
}

module.exports = UserLimitCommand