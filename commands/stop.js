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
        
        console.log(`Process remotely shut down by ${message.author.tag} in ${message.guild}`)
        await message.channel.send( {embed: {
            type: 'rich',
            description: `Putting ${this.client.user} to sleep...`
        }})
        
        this.client.testing ? process.exit() : this.client.destroy()
    }
}

module.exports = ShutdownCommand;