const { Command } = require('discord-akairo');
const { prism } = require('../../../config')

class RenameCallCommand extends Command {
    constructor() {
        super('renameCall', {
            aliases: ['rename', 'renameCall'],
            args: [
                {
                    id: 'name',
                    type: 'string',
                    match: 'rest'
                }
            ],
            description: {
                content: 'Renames the private call',
                usage: 'renameCall <name>'
            },
            category: 'calls'

        })
    }

    async exec(message, args) {

        try{
        if(message.channel.topic.split(';').shift() !== 'PRIVATE CALL') return message.reply('This is not a private call text channel, please either make one or use an existing one.');
        else if(message.channel.topic.split(';').shift() === 'PRIVATE CALL') {

            const voiceChannel = message.guild.channels.cache.get(message.channel.topic.split(';').pop())

            await voiceChannel.setName('🔒 '+ args.name)
            await message.channel.setName('🔒 '+ args.name)
            
        }
    }catch(e) {console.log(e)}
    }
}

module.exports = RenameCallCommand;