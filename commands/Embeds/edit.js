const { Command } = require('discord-akairo');
const { rgb, linkToMessage } = require('../../functions')

class EditEmbedCommand extends Command {
    constructor() {
        super('embed-edit', {
            aliases: ['embed-edit','embededit'],
            description: {
                content: 'Edits an existing embed',
                usage: `edit <message URL> <option> \n**Options:**\n- Title\n- Description\n- Color\n- Thumbnail \n- Image`
            },
            category: 'embeds',
            userPermissions: 'MANAGE_MESSAGES',
            args: [
                {
                    id: 'link',
                },
                {
                    id: 'option'
                },
                {
                    id: 'arg1'
                },
                {
                    id: 'arg2'
                }
            ],
            split: 'quoted'
        })
    }

    async exec(message, args) {

        const targetMessage = await linkToMessage(args.link, this.client);
        const channel = targetMessage.channel;

        let embed = targetMessage.embeds[0]

        let embedThumbnail = null
        if(Boolean(embed.thumbnail)) {embedThumbnail = {url: embed.thumbnail.url}}

        let embedImage = null
        if(Boolean(embed.image)) {embedImage = {url: embed.image.url}}

        let embedVideo = null
        if(Boolean(embed.video)) {embedVideo = {url: embed.video.url}}

        let embedAuthor = null
        if(Boolean(embed.author)) {embedAuthor = {
            name: embed.author.name,
            icon_url: embed.author.icon_url,
            url: embed.author.url
        }}
        
        if(targetMessage.author.id !== this.client.user.id) return message.reply('I can only edit my own embeds.')

        if(!channel.permissionsFor(message.author).has('SEND_MESSAGES')) return message.reply('You don\'t have permission to edit messages here.')

        switch(args.option) {
            
            case 'color':

                try{

                    let color = rgb(args.arg1)

                    targetMessage.edit({embed: {

                        type: 'rich',
                        title: embed.title,
                        description: embed.description,
                        url: embed.url,
                        color: color,
                        fields: null,
                        timestamp: embed.timestamp,
                        thumbnail: embedThumbnail,
                        image: embedImage,
                        video: embedVideo,
                        author: embedAuthor,
                        provider: embed.provider,
                        footer: embed.footer

                    }})
                    .then(message.react('👌'))
                    
                } catch(error) {
                    message.reply('Something went wrong, please ensure you used a correct colour format.')
                    console.log(error)
                }
            break;

            case 'title':
                try{

                    targetMessage.edit({embed: {

                        type: 'rich',
                        title: args.arg1,
                        description: embed.description,
                        url: embed.url,
                        color: embed.color,
                        fields: null,
                        timestamp: embed.timestamp,
                        thumbnail: embedThumbnail,
                        image: embedImage,
                        video: embedVideo,
                        author: embedAuthor,
                        provider: embed.provider,
                        footer: embed.footer

                    }})
                    .then(message.react('👌'))

                } catch(error) {
                    message.reply('Something went wrong, the command should look like this \`embed-edit <channel> <message ID> title \"title\"\`')
                    console.log(error)
                }    
            break;

            case 'description':
                try{

                    targetMessage.edit({embed: {

                        type: 'rich',
                        title: embed.title,
                        description: args.arg1,
                        url: embed.url,
                        color: embed.color,
                        fields: null,
                        timestamp: embed.timestamp,
                        thumbnail: embedThumbnail,
                        image: embedImage,
                        video: embedVideo,
                        author: embedAuthor,
                        provider: embed.provider,
                        footer: embed.footer

                    }})
                    .then(message.react('👌'))

                } catch(error) {
                    message.reply('Something went wrong, the command should look like this \`embed-edit <channel> <message ID> description \"description\"\`')
                    console.log(error)
                }
            break;

            case 'thumbnail':

                try{

                    targetMessage.edit({embed: {
    
                        type: 'rich',
                        title: embed.title,
                        description: embed.description,
                        url: embed.url,
                        color: embed.color,
                        fields: null,
                        timestamp: embed.timestamp,
                        thumbnail: {
                            url: args.arg1
                        },
                        image: embedImage,
                        video: embedVideo,
                        author: embedAuthor,
                        provider: embed.provider,
                        footer: embed.footer
    
                    }})
                    .then(message.react('👌'))

                } catch(error) {
                    message.reply('Something went wrong, the command should look like this \`embed-edit <channel> <message ID> thumbnail <image URL>\`')
                    console.log(error)
                }
                
            break;

            case 'image':

                try{
                    
                    targetMessage.edit({embed: {

                        type: 'rich',
                        title: embed.title,
                        description: embed.description,
                        url: embed.url,
                        color: embed.color,
                        fields: null,
                        timestamp: embed.timestamp,
                        thumbnail: embedThumbnail,
                        image: {
                            url: args.arg1
                        },
                        video: embedVideo,
                        author: embedAuthor,
                        provider: embed.provider,
                        footer: embed.footer

                    }})
                    .then(message.react('👌'))
                    
                } catch(error) {
                    message.reply('Something went wrong, the command should look like this \`embed-edit <channel> <message ID> image <image URL>\`')
                    console.log(error)
                }
            break;
            
            case 'footer':

                try{
                    
                    targetMessage.edit({embed: {

                        type: 'rich',
                        title: embed.title,
                        description: embed.description,
                        url: embed.url,
                        color: embed.color,
                        fields: null,
                        timestamp: embed.timestamp,
                        thumbnail: embedThumbnail,
                        image: embedImage,
                        video: embedVideo,
                        author: embedAuthor,
                        provider: embed.provider,
                        footer: {
                            
                            text: args.arg1
                        }

                    }})
                    .then(message.react('👌'))

                } catch(error) {
                    message.reply('Something went wrong, the command should look like this \`embed-edit <channel> <message ID> footer <text>\`')
                    console.log(error)
                }
            
            break;

        }   
    }  
}

module.exports = EditEmbedCommand