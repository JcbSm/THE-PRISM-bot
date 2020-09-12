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
        if (diff < 0 ) return number;
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

    linkToMessage: async function linkToMessage(link, client = this.client) {
        let arr = link.split('/').slice(Math.max(link.split('/').length - 2, 0));
        return await (await client.channels.fetch(arr[0])).messages.fetch(arr[1]);
    },

    getLocalTime: function getLocalTime(date, milliseconds) {
        if(date === undefined) {date = new Date()}
        let arr = []
        arr.push(module.exports.pad(date.getHours(), 2));
        arr.push(module.exports.pad(date.getMinutes(), 2));
        arr.push(module.exports.pad(date.getSeconds(), 2));
        if(milliseconds === true) arr.push(module.exports.pad(date.getUTCMilliseconds(), 3))
        return arr.join(':')
    },
    
    getUTCTime: function getUTCTime(date = new Date(), milliseconds = false) {
        let arr = []
        arr.push(module.exports.pad(date.getUTCHours(), 2));
        arr.push(module.exports.pad(date.getUTCMinutes(), 2));
        arr.push(module.exports.pad(date.getUTCSeconds(), 2));
        if(milliseconds === true) arr.push(module.exports.pad(date.getUTCMilliseconds(), 3))
        return arr.join(':')
    },

    since: function since(timestamp, max = 6) {
 
        const seconds = Math.round((new Date() - timestamp)/1000);
        let msgArray = [];
        let count = 0;
        
        let interval = Math.floor(seconds / (3600*24*30.4375*12))
        if(interval === 1 && count < max) {
            msgArray.push(`${interval} year`);
            ++count;
        } else if (interval > 1 && count < max) {
            msgArray.push(`${interval} years`);
            ++count;
        }

        const rMonths = seconds % (3600*24*30.4375*12);
        interval = Math.floor(rMonths / (3600*24*30.4375))
        if(interval === 1 && count < max) {
            msgArray.push(`${interval} month`);
            ++count;
        } else if (interval > 1 && count < max) {
            msgArray.push(`${interval} months`);
            ++count;
        }

        const rDays = seconds % (3600*24*30.4375);
        interval = Math.floor(rDays / (3600*24));
        if(interval === 1 && count < max) {
            msgArray.push(`${interval} day`);
            ++count;
        } else if (interval > 1 && count < max) {
            msgArray.push(`${interval} days`);
            ++count;
        }

        const rHours = seconds % 3600*24;
        interval = Math.floor(rHours / 3600);
        if(interval === 1 && count < max) {
            msgArray.push(`${interval} hour`);
            ++count;
        } else if (interval > 1 && count < max) {
            msgArray.push(`${interval} hours`);
            ++count;
        }

        const rMinutes = seconds % 3600;
        interval = Math.floor(rMinutes / 60);
        if(interval === 1 && count < max) {
            msgArray.push(`${interval} minute`);
            ++count;
        } else if (interval > 1 && count < max) {
            msgArray.push(`${interval} minutes`);
            ++count;
        }

        const rSeconds = seconds % 60
        interval = Math.floor(rSeconds);
        if(interval === 1 && count < max) {
            msgArray.push(`${interval} second`);
            ++count;
        } else if (interval > 1 && count < max) {
            msgArray.push(`${interval} seconds`);
            ++count;
        }

        return msgArray.join(', ')
    },

    milliToTime: function milliToTime(milli) {
        let arr = []
        arr.push(module.exports.pad(Math.floor((milli / (60 * 60 * 1000)) % 60), 2))
        arr.push(module.exports.pad(Math.floor((milli / (60 * 1000)) % 60), 2))
        arr.push(module.exports.pad(Math.floor((milli / 1000) % 60), 2))
        arr.push(module.exports.pad(milli % 1000, 3))
        return arr.join(':')
    },

    alphabetical: function alphabetical(str) {
        return str.toLowerCase().split("").sort().join('')
    },

    compareArray: function compareArray(a, b) {
        let valid = true
        if(a.length !== b.length) {
            valid = false
        } else {
            for(i = 0; i < a.length; i++) {
                valid = a[i] === b[i] ? valid : false
            }
        }
        return valid;
    },

    rng: function rng(max = 1, min = 0) {
        return Math.floor((Math.random() * (Math.floor(max + 1) - Math.floor(min)) + Math.floor(min)))
    },

    xpCalc: function xpCalc(i) {
        return Math.floor(5 * Math.pow(135, 2) * ((Math.pow(10, 3) * Math.exp(-Math.pow(10, -3)* i) + i) - Math.pow(10, 3)))
    },

    groupDigits: function groupDigits(n) {
        const arr = n.toString().split("").reverse();
        for(let i = 0; i < arr.length; i++) {
            if(Number.isInteger((i+1)/4)) {
                arr.splice(i, 0, ",")
            }
        }
        return arr.reverse().join("")
    },

    mentionToID: function mentionToID(str) {
        return str.replace(/\D/gi, '')
    },

    
}