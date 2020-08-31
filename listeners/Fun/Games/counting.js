const { Listener } = require('discord-akairo');
const { prism } = require('../../../config');
const { linkToMessage } = require('../../../functions')

class CountingListener extends Listener {
    constructor() {
        super('counting', {
            emitter: 'client',
            event: 'message'

        })
    }

    async exec(message) {

        try{

            // The Game

            if(message.channel.id !== prism.guild.channelIDs.counting) return;
            const lastCount = (await message.channel.messages.fetch( {limit:2} )).last()
            let valid;
            if(/^[1-9]\d*$/.test(message.content)) {
                valid = true
            }
            if(Number(message.content) !== Number(lastCount.content)+1 || message.author.id === lastCount.author.id || !valid) return message.delete();


            // Count Tracker

            const DB = this.client.db;

            DB.query(`
                SELECT Counts FROM Users
                WHERE ID = ${message.author.id}
            `, (err, res) => {

                if(res.rows.length > 0) {

                    const counts = res.rows[0].counts

                    DB.query(`
                        UPDATE Users
                        SET Counts = ${counts + 1}
                        WHERE ID = ${message.author.id};
                    `)
                }
                
            })


            // Top Counter
            
            const pinMessage = await linkToMessage('https://discordapp.com/channels/447504770719154192/583742663627505669/749343323793260645', this.client);
            
            const topCounter = await this.client.users.fetch('140150251213422592')
            //let currentCounts = Number(pinMessage.embeds[0].description.split('\`')[1])
            let currentCounts = (await this.client.db.query(`SELECT Counts FROM Users WHERE ID = ${topCounter.id}`)).rows[0].counts
            let recentCountValue = pinMessage.embeds[0].fields[1].value

            if(message.author.id === topCounter.id) {

                recentCountValue = `\`${Number(message.content)}\``
            }

            pinMessage.edit('', { embed: {
                title: `The ${message.guild.name} top counter`,
                description: `${topCounter} counts: \`${currentCounts}\``,
                fields: [
                    {
                        name: 'Percentage of all counts',
                        value: `\`${Math.round(currentCounts/Number(message.content)*10000)/100}%\``
                    },
                    {
                        name: 'Most recent count',
                        value: recentCountValue
                    }
                ]
            }})
        
        } catch(e) {console.log(e)}
    }
}

module.exports = CountingListener;