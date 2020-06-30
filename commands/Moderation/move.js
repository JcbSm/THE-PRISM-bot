const { Command } = require('discord-akairo');

class MoveCommand extends Command {
    constructor() {
        super('move', {
            aliases: ['move'],
            args: [
                {
                    id: 'channel',
                    type: 'channel'
                },
                {
                    id: 'members',
                    type: 'string',
                    match: 'rest'
                }
            ],
            split: 'quoted',
            description: {
                content: 'Moves all or given members into a specified voice channel. The members must be mentions and split by spaces',
                usage: 'move <channel> <"all" | members>'
            },
            userPermissions: 'MOVE_MEMBERS'
        })
    }

    async exec(message, args) {

        try{

            let allChannelMembers = await message.member.voice.channel.members;

            if(args.members === 'all') {

                for (let i = 0; i < allChannelMembers.keyArray().length; i++) {
                    
                    await allChannelMembers.get(allChannelMembers.keyArray()[i]).voice.setChannel(args.channel)
                }

            } else {

                let memberArray = (((args.members.split('<').join('')).split('@').join('')).split('>').join('')).split('!').join('').split(' ');

                let channelMembers = []

                for (let i = 0; i < memberArray.length; i++ ) {

                    let oneMember = allChannelMembers.get(memberArray[i]);
                    channelMembers.push(oneMember)

                }
                
                for (let i = 0; i < channelMembers.length; i++) {
                       
                    await channelMembers[i].voice.setChannel(args.channel)
                }
                
            }
        } catch(e) {
            message.reply('An error occurred, type "-help move" for more information.')
            console.log(e)
        }
    }
}

module.exports = MoveCommand;