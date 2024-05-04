
const EventEmitter = require('node:events');

const url = 'http://mylogger.io/log'

class logger extends EventEmitter{
    log(message) {
        //Send http request
        console.log(message);

        //Raise event
        this.emit('messageLogged', { id: 1, url: 'http://' })
    }
}

module.exports = logger;