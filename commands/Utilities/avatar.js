const { Command } = require('discord-akairo');
const { colors } = require('../../config');

class AvatarCommand extends Command {
    constructor() {
        super('avatar', {
            aliases: ['avatar'],
            args: [
                {
                    id: 'member',
                    type: 'member'
                }
            ],
            description: {
                content: 'View a user\'s avatar on a larger scale, if you don\'t specify a user, your own avatar will be shown.',
                usage: 'avatar <member>'
            },
            category: 'utilities'
        });
    }

    exec(message, args) {

        try{

            const member = args.member ? args.member : message.member

            message.channel.send({ embed: {

                type: 'rich',
                image: { url: member.user.displayAvatarURL({size: 4096}) },
                color: colors.purple
                
            }})
            
        } catch(e) {console.log(e)}
    }
}

module.exports = AvatarCommand;