const { Listener } = require('discord-akairo');
const { prism, colors } = require('../../config')
const { rgb } = require('../../functions')

class AutoResponderListener extends Listener {
    constructor() {
        super('autoResponder', {
            emitter: 'client',
            event: 'message'

        })
    }

    async exec(message) {

        if(message.channel.id === '568455212419776512') {

            if(this.client.testing) {

                message.embeds[0].color === rgb(colors.good) ? process.exit() : ''
                
            } else {

                message.embeds[0].color === rgb(colors.test) ? this.client.destroy() : ''
            }

            

        }

        if(!message.guild) return;
        if(message.guild.id !== '447504770719154192') return;
        if(message.author.bot) return;

        //AutoMod
        if(/(discord.gg\/)/.test(message.content) || /(discordapp.com\/invite\/)/.test(message.content)) {
            if(!message.author.permissions.has('MANAGE_SERVER')) message.delete()
        }

        //Bad Words
        {
            if(/nigg/i.test(message.content.split(" ").join("").split(/\W/).join("").split("_").join("").split(/1/).join("i").split(/4/).join("a").split(/3/).join("e").split(/\d/).join(""))) {
                /*if(message.guild.ownerID === message.author.id) {
                    message.channel.send("Jacob has the N pass")
                } else {*/
                    message.channel.send(`${message.member} is a racist!`)
                    message.delete()
                //}
            }
        }

        if(message.channel.id === prism.guild.channelIDs.um) return;

        if(message.mentions.roles.size > 0) {

            message.channel.send('<:pingsock:731609128941912096>')
        }

        if(/^gn$/gi.test(message.content) || /^goodnight$/gi.test(message.content.split(" ").join("")) || /^night$/gi.test(message.content)) {
            
            let responses = ['Sleep well', 'Goodnight', 'Sweet dreams', 'Don\'t let the bed bugs bite', 'Night']
            let i = Math.floor(Math.random()*responses.length)

            message.channel.send(`${responses[i]}, ${message.author}`)

        }

        if(/^gm$/gi.test(message.content) || /^goodmorning$/gi.test(message.content.split(" ").join("")) || /^morning$/gi.test(message.content)) {
            
            let responses = ['Morning', 'Good morning', 'Rise and shine', 'Hey', 'Welcome back']
            let i = Math.floor(Math.random()*responses.length)

            message.channel.send(`${responses[i]}, ${message.author}`)

        }

        //Prism meme ones
        {
            if(/booo*ty/gi.test(message.content.split(" ").join(""))) message.react('535581424435200010')
            if(/prism/gi.test(message.content)) message.react('597841926451888130')
            if(/^helll*oo*o$/i.test(message.content)) message.react('453964150385672203')
            if(/brian/i.test(message.content)) message.react('453928256371032064')
            if(/asda/i.test(message.content)) message.react('731691628955435041')
        }

        //Memes 

        {
            if(/ligma/gi.test(message.content.split('').join(''))) message.channel.send('What\'s Ligma?')
        }

        //Normal stuff
        {
            if(/^no u$/i.test(message.content)) message.reply('no u')
            if(/^ok/i.test(message.content)) message.react('👌')
            if(/^no$/i.test(message.content)) message.react('730846979977904218')
            if(/^yes$/i.test(message.content)) message.react('✅')
            if(/^yes or no$/i.test(message.content)) {
                message.react('✅'); message.react('730846979977904218')
            }
            if(/bruh/i.test(message.content)) message.react('623624603675394048')
            if(/\<3/i.test(message.content)) message.react('♥️')
        }


        //Emoji face reactions
        {
            if(/\w*\;\)\w*/i.test(message.content)) message.react('😉')
            if(/\:\)/i.test(message.content)) message.react('🙂')
            if(/\:\(/i.test(message.content)) message.react('🙁')
            if(/hmm/i.test(message.content)) message.react('448143170509733899') 
            if(/B\)/i.test(message.content)) message.react('😎')
        }
    }
}

module.exports = AutoResponderListener;