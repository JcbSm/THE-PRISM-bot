module.exports = {

    rgb: function rgb(inputColor) {

        const Color = require('color')
        return Color(inputColor).rgbNumber()
    },

    getMessageLink: function getMessageLink(message) {
        
    }
}