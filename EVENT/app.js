
const EventEmitter = require('node:events');

const Logger = require('./logger')
const logger = new Logger()

//Register
logger.on('messageLogged', (arg) =>{
    console.log('messageLogged', arg);
})

logger.log('message')

