module.exports = {

    rgb: function rgb(inputColor) {

        const Color = require('color')
        return Color(inputColor).rgbNumber()
    },

    linkToMessage: async function linkToMessage(link, client) {
        let arr = link.split('/').slice(Math.max(link.split('/').length - 2, 0));
        return await (await client.channels.fetch(arr[0])).messages.fetch(arr[1]);
    },

    getTime: function getTime(date) {
        if(date === undefined) {date = new Date()}
        return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    },
}