const { Command } = require('discord-akairo');

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

        const donationChannel = this.client.channels.get('661310749947461691');
        const donationMessage = await donationChannel.fetchMessage('661315838069964823')

        const currentValue = Number(donationMessage.content.split("\n").pop().trim().split(" ").shift().split('£').pop())

        const newValue = currentValue + args.value


        if(message.guild.id !== '447504770719154192') return;

        let donationBar = '[----------------------------]'

        if(newValue/500 >= (500/28)/500) donationBar = '[■---------------------------]';
        if(newValue/500 >= 2*(500/28)/500) donationBar = '[■■--------------------------]';
        if(newValue/500 >= 3*(500/28)/500) donationBar = '[■■■-------------------------]';
        if(newValue/500 >= 4*(500/28)/500) donationBar = '[■■■■------------------------]';
        if(newValue/500 >= 5*(500/28)/500) donationBar = '[■■■■■-----------------------]';
        if(newValue/500 >= 6*(500/28)/500) donationBar = '[■■■■■■----------------------]';
        if(newValue/500 >= 7*(500/28)/500) donationBar = '[■■■■■■■---------------------]';
        if(newValue/500 >= 8*(500/28)/500) donationBar = '[■■■■■■■■--------------------]';
        if(newValue/500 >= 9*(500/28)/500) donationBar = '[■■■■■■■■■-------------------]';
        if(newValue/500 >= 10*(500/28)/500) donationBar = '[■■■■■■■■■■------------------]';
        if(newValue/500 >= 11*(500/28)/500) donationBar = '[■■■■■■■■■■■-----------------]';
        if(newValue/500 >= 12*(500/28)/500) donationBar = '[■■■■■■■■■■■■----------------]';
        if(newValue/500 >= 13*(500/28)/500) donationBar = '[■■■■■■■■■■■■■---------------]';
        if(newValue/500 >= 14*(500/28)/500) donationBar = '[■■■■■■■■■■■■■■--------------]';
        if(newValue/500 >= 15*(500/28)/500) donationBar = '[■■■■■■■■■■■■■■■-------------]';
        if(newValue/500 >= 16*(500/28)/500) donationBar = '[■■■■■■■■■■■■■■■■------------]';
        if(newValue/500 >= 17*(500/28)/500) donationBar = '[■■■■■■■■■■■■■■■■■-----------]';
        if(newValue/500 >= 18*(500/28)/500) donationBar = '[■■■■■■■■■■■■■■■■■■----------]';
        if(newValue/500 >= 19*(500/28)/500) donationBar = '[■■■■■■■■■■■■■■■■■■■---------]';
        if(newValue/500 >= 20*(500/28)/500) donationBar = '[■■■■■■■■■■■■■■■■■■■■--------]';
        if(newValue/500 >= 21*(500/28)/500) donationBar = '[■■■■■■■■■■■■■■■■■■■■■-------]';
        if(newValue/500 >= 22*(500/28)/500) donationBar = '[■■■■■■■■■■■■■■■■■■■■■■------]';
        if(newValue/500 >= 23*(500/28)/500) donationBar = '[■■■■■■■■■■■■■■■■■■■■■■■-----]';
        if(newValue/500 >= 24*(500/28)/500) donationBar = '[■■■■■■■■■■■■■■■■■■■■■■■■----]';
        if(newValue/500 >= 25*(500/28)/500) donationBar = '[■■■■■■■■■■■■■■■■■■■■■■■■■---]';
        if(newValue/500 >= 26*(500/28)/500) donationBar = '[■■■■■■■■■■■■■■■■■■■■■■■■■■--]';
        if(newValue/500 >= 27*(500/28)/500) donationBar = '[■■■■■■■■■■■■■■■■■■■■■■■■■■■-]';
        if(newValue/500 >= 28*(500/28)/500) donationBar = '[■■■■■■■■■■■■■■■■■■■■■■■■■■■■]';


        const moneyValue = newValue
        const value = Math.round(newValue)

        let donationValue = '000'

        if(newValue < 10) donationValue = '00' + value
        if(newValue < 100 && value >= 10) donationValue = '0' + value
        if(newValue < 1000 && value >= 100) donationValue = value

        const donationText = `╔════╣ 2020 Donations Board ╠════╗\n║ ${donationBar} ║\n╚══════════╣ ${donationValue}//500 ╠══════════╝`

        

        donationMessage.edit(`\`\`\`${donationText}\n\n       £${moneyValue} Donated so far\`\`\``)


        await message.react('👌')
    }

}

module.exports = AddDonationCommand;