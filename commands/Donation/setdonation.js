const { Command } = require('discord-akairo');

class SetDonationCommand extends Command {
    constructor() {
        super('setDonation', {
            aliases: ['setDonation'],
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

        if(message.guild.id !== '447504770719154192') return;

        let donationBar = '[----------------------------]'

        if(args.value/500 >= (500/28)/500) donationBar = '[■---------------------------]';
        if(args.value/500 >= 2*(500/28)/500) donationBar = '[■■--------------------------]';
        if(args.value/500 >= 3*(500/28)/500) donationBar = '[■■■-------------------------]';
        if(args.value/500 >= 4*(500/28)/500) donationBar = '[■■■■------------------------]';
        if(args.value/500 >= 5*(500/28)/500) donationBar = '[■■■■■-----------------------]';
        if(args.value/500 >= 6*(500/28)/500) donationBar = '[■■■■■■----------------------]';
        if(args.value/500 >= 7*(500/28)/500) donationBar = '[■■■■■■■---------------------]';
        if(args.value/500 >= 8*(500/28)/500) donationBar = '[■■■■■■■■--------------------]';
        if(args.value/500 >= 9*(500/28)/500) donationBar = '[■■■■■■■■■-------------------]';
        if(args.value/500 >= 10*(500/28)/500) donationBar = '[■■■■■■■■■■------------------]';
        if(args.value/500 >= 11*(500/28)/500) donationBar = '[■■■■■■■■■■■-----------------]';
        if(args.value/500 >= 12*(500/28)/500) donationBar = '[■■■■■■■■■■■■----------------]';
        if(args.value/500 >= 13*(500/28)/500) donationBar = '[■■■■■■■■■■■■■---------------]';
        if(args.value/500 >= 14*(500/28)/500) donationBar = '[■■■■■■■■■■■■■■--------------]';
        if(args.value/500 >= 15*(500/28)/500) donationBar = '[■■■■■■■■■■■■■■■-------------]';
        if(args.value/500 >= 16*(500/28)/500) donationBar = '[■■■■■■■■■■■■■■■■------------]';
        if(args.value/500 >= 17*(500/28)/500) donationBar = '[■■■■■■■■■■■■■■■■■-----------]';
        if(args.value/500 >= 18*(500/28)/500) donationBar = '[■■■■■■■■■■■■■■■■■■----------]';
        if(args.value/500 >= 19*(500/28)/500) donationBar = '[■■■■■■■■■■■■■■■■■■■---------]';
        if(args.value/500 >= 20*(500/28)/500) donationBar = '[■■■■■■■■■■■■■■■■■■■■--------]';
        if(args.value/500 >= 21*(500/28)/500) donationBar = '[■■■■■■■■■■■■■■■■■■■■■-------]';
        if(args.value/500 >= 22*(500/28)/500) donationBar = '[■■■■■■■■■■■■■■■■■■■■■■------]';
        if(args.value/500 >= 23*(500/28)/500) donationBar = '[■■■■■■■■■■■■■■■■■■■■■■■-----]';
        if(args.value/500 >= 24*(500/28)/500) donationBar = '[■■■■■■■■■■■■■■■■■■■■■■■■----]';
        if(args.value/500 >= 25*(500/28)/500) donationBar = '[■■■■■■■■■■■■■■■■■■■■■■■■■---]';
        if(args.value/500 >= 26*(500/28)/500) donationBar = '[■■■■■■■■■■■■■■■■■■■■■■■■■■--]';
        if(args.value/500 >= 27*(500/28)/500) donationBar = '[■■■■■■■■■■■■■■■■■■■■■■■■■■■-]';
        if(args.value/500 >= 28*(500/28)/500) donationBar = '[■■■■■■■■■■■■■■■■■■■■■■■■■■■■]';


        const moneyValue = args.value
        const value = Math.round(args.value)

        let donationValue = '000'

        if(args.value < 10) donationValue = '00' + value
        if(args.value < 100 && value >= 10) donationValue = '0' + value
        if(args.value < 1000 && value >= 100) donationValue = value

        const donationText = `╔════╣ 2020 Donations Board ╠════╗\n║ ${donationBar} ║\n╚══════════╣ ${donationValue}//500 ╠══════════╝`

        const donationChannel = this.client.channels.get('661310749947461691');
        const donationMessage = await donationChannel.fetchMessage('661315838069964823')

        donationMessage.edit(`\`\`\`${donationText}\n\n       £${moneyValue} Donated so far\`\`\``)


        await message.react('👌')
    }

}

module.exports = SetDonationCommand;