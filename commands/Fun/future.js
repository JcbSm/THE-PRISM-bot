const { Command } = require('discord-akairo');
const Discord = require('discord.js')
const color = require('../../datafiles/colors.json')

class FutureCommand extends Command {
    constructor() {
        super('future', {
            aliases: ['future'],
            description: {
                content: 'Tells the future',
                usage: 'future'
            },
            category: 'fun'
        });
    };

    exec(message) {

        let futureEmbed = new Discord.RichEmbed

        //Filter COllection to remove bot
        let membersFiltered = message.guild.members.filter(tag => tag.id !== this.client.user.id) 

        //Select random member
        let randomMember = membersFiltered.random()

        const firstMessage = ['Reading DNA', 'Looking through family tree', 'Conducting research']
        const result = Math.floor(Math.random()*firstMessage.length)
        
        message.channel.send(`**${firstMessage[result]}**`).then((sent) => {

            const secondMessage = ['Finding out the truth', 'Rummaging through old Club Penguin accounts', 'Buying data from Facebook', 'Asking parental constent']
            const result = Math.floor(Math.random()*secondMessage.length);

            setTimeout( () => sent.edit(`**${secondMessage[result]}**`).then(msg => msg.delete(2400)), 3000)
        })

        let salary = Math.floor(Math.random()*85 + 15)
        let jobs = [`${message.guild.name} worker`, `${membersFiltered.random().user.username}\'s slave`, 'Depressed office worker', 'Circus act.']
        let jobPicker = Math.floor(Math.random()*jobs.length)
        let spouse = ''

        if(!randomMember.nickname) {
            spouse = randomMember.user.username
        } else {
            spouse = randomMember.nickname
        }

        futureEmbed.setAuthor(message.author.tag, message.author.avatarURL)
        futureEmbed.addField('Spouse', spouse, true)
        futureEmbed.setColor(color.purple)
        futureEmbed.addField('Job', jobs[jobPicker], true)
        futureEmbed.addField('Salary', `£${salary},000`, true)
        futureEmbed.addField('Children', (Math.floor(Math.random()*4))+1)

        setTimeout( () => message.channel.send(futureEmbed), 6000)
    }
}

module.exports = FutureCommand;