const { Command } = require('discord-akairo');

class ShutdownCommand extends Command {
    constructor() {
        super('shutdown', {
            aliases: ['shutdown', 'stop', 'kys'],
            description: {
                content: 'Stops the bot',
                usage: 'shutdown'
            },
            ownerOnly: true,
        })
    }

    async exec(message) {

        if(message.author.id !== '227848397447626752') return;
        
        console.log(`Process remotely shut down by ${message.author.tag} in ${message.guild}`)
        await message.channel.send(`Putting ${this.client.user} to sleep...`)
        await this.client.destroy()
    }
}

module.exports = ShutdownCommand;