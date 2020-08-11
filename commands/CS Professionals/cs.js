const { Command } = require('discord-akairo');

class CSCommand extends Command {
    constructor() {
        super('cs', {
            aliases: ['cs']
        }) 
    }

    async exec(message) {

        if(message.guild.id === '742026925156860026') {

            let sent = await message.channel.send(`${message.guild.roles.everyone} cs or bent?`)
            await sent.react('✅');
            await sent.react('❎');

        }
    }
}

module.exports = CSCommand