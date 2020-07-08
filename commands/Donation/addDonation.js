const { Command } = require('discord-akairo');
const { pad } = require('../../functions')

class AddDonationCommand extends Command {
    constructor() {
        super('donate', {
            aliases: ['donate'],
            args: [
                {
                    id: 'value',
                    type: 'number'
                }
            ],
            userPermissions: 'MANAGE_GUILD',
        })
    }

    async exec(message, args) {
        try{
            const donationChannel = (await this.client.channels.fetch('661310749947461691'));
            const donationMessage = (await donationChannel.messages.fetch('661315838069964823'));

            const currentValue = Number(donationMessage.content.split("\n").pop().trim().split(" ").shift().split('£').pop())
            const goal = Number(donationMessage.content.split("//").pop().split(' ').shift())

            const newValue = currentValue + Math.round((args.value)*100)/100
        
            if(message.guild.id !== '447504770719154192') return;

            let barProgress = Math.floor((newValue/goal)*28);
            if(barProgress > 28) barProgress = 28;
            const barRemainder = 28 - barProgress
            let bar = [];

            for ( i = 0; i < barProgress; i++) {
                bar.push('■');
            }
            for (i = 0; i < barRemainder; i++) {
                bar.push('-')
            }

            const donationBar = `[${bar.join('')}]`;
            const value = pad(Math.round(newValue), 3)
            const donationText = `╔════╣ 2020 Donations Board ╠════╗\n║ ${donationBar} ║\n╚══════════╣ ${value}//${goal} ╠══════════╝`

            donationMessage.edit(`\`\`\`${donationText}\n\n       £${newValue} Donated so far\`\`\``)

            await message.react('👌')
        
        } catch(e) {
            
            console.log(e)
        }
    }

}

module.exports = AddDonationCommand;