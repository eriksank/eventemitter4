var EventEmitter=require('../../index.js');
var emitter=new EventEmitter();

emitter.on('finished-eating',function(who) {
        console.log('clean up the table, '+who+'.');
});

emitter.emit('finished-eating','John');

