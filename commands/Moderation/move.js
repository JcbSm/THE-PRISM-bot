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
                content: 'Moves all or given members into a specified voice channel. Split members with \';\'',
                usage: 'move <channel> <"all" | members>'
            },
            userPermissions: 'MOVE_MEMBERS'
        })
    }

    async exec(message, args) {

        try{

            let allChannelMembers = await message.member.voice.channel.members;

            if(!args.members) {
                await message.member.voice.setChannel(args.channel);
                
            }else if(args.members === 'all') {

                for (let i = 0; i < allChannelMembers.keyArray().length; i++) {
                    
                    await allChannelMembers.get(allChannelMembers.keyArray()[i]).voice.setChannel(args.channel)
                }

            } else {

                let memberArray = args.members.split(';');
                let unresolveable = []
                
                for (const resolveable of memberArray) {
                    
                    const member = this.client.util.resolveMember(resolveable.trim(), message.guild.members.cache)

                    if(!member) {
                        unresolveable.push(resolveable.trim())
                    } else if(message.member.voice.channel.members.keyArray().includes(member.user.id)) {
                        member.voice.setChannel(args.channel)
                    }
                }

                if(unresolveable.length > 0) {

                    message.reply(`Unable to resolve: \`${unresolveable.join(', ')}\``)
                }                
            }
        } catch(e) {
            message.reply('An error occurred, type "-help move" for more information.')
            console.log(e)
        }
    }
}

module.exports = MoveCommand;