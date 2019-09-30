const { Listener } = require('discord-akairo');

class PrisonListener extends Listener {
    constructor() {
        super('prison', {
            emitter: 'client',
            eventName: 'message'
        })
    }

    exec(message) {

        if(message.author.id == '567738379639324674') return;

        if(message.channel.parentID === '621090444570394634') {
            
            if(message.content.toLowerCase().includes('fuck') || message.content.toLowerCase().includes('shit') || message.content.toLowerCase().includes('bitch') || message.content.toLowerCase().includes('cunt')) {

                let responses = 
                [
                    'Please don\'t swear, you\'ve done enough bad already',
                    'Don\'t swear, please....',
                    'This is a prison, shut it!',
                    'Language!',
                    'Wash your mouth, you\'re disgusting....'
                ]
                let result = Math.floor(Math.random()*responses.length)
                
                return message.reply(responses[result])
            
            } else if(message.content.toLowerCase() == 'hi' || message.content.toLowerCase() === 'hey' || message.content.toLowerCase() === 'hello') {
                
                let responses = 
                [
                    'Hey, how\'s it going.',
                    'Welcome.',
                    'Sup',
                    'Hi'
                ]
                let result = Math.floor(Math.random()*responses.length)
                
                return message.reply(responses[result])
            
            } else if(message.content.toLowerCase().includes('')) {

            }

        }
    }
}

module.exports = PrisonListener;