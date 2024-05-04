
const EventEmitter = require('node:events');
const emitter = new EventEmitter();

//Register event
emitter.on('logging', (arg) =>{
    console.log('logging', arg);
})

//Event Raised
emitter.emit('logging', '(data: message)')