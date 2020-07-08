module.exports = {

    pad: function pad(number, digits) {
        Number(number); Number(digits);
        if(number<0) return;
        let n = number;
        if(n === 0) {
            ++n;
        }
        let count = 0;
        if(n >= 1) ++count;
        while (n/10 >= 1) {
            n /= 10;
            ++count;
        }
        let diff;
        diff = digits - count;
        if (diff < 0 ) return;
        let numArray = number.toString().split("");
        for (i = 0; i < diff; i++) {

            numArray.unshift('0');
        }
        return numArray.join('')
    },
    
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
        return `${module.exports.pad(date.getHours(), 2)}:${module.exports.pad(date.getMinutes(), 2)}:${module.exports.pad(date.getSeconds(), 2)}`
    },
    
    getUTCTime: function getTime(date) {
        if(date === undefined) {date = new Date()}
        return `${module.exports.pad(date.getUTCHours(), 2)}:${module.exports.pad(date.getUTCMinutes(), 2)}:${module.exports.pad(date.getUTCSeconds(), 2)}`
    },
}