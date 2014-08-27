var EventEmitter=require('../../index.js');
var emitter=new EventEmitter();

//Mum
emitter.on('finished-eating',function(who) {
        console.log('clean up the table, '+who+'.');
});

//Mum
emitter.on('finished-playing-ball',function(who) {
        console.log('go, take a shower, '+who+'.');
});

//john
emitter.onAny(function(who) {
        if(who==='John')
                console.log('yes, mum');
});

emitter.emit('finished-eating','John');
emitter.emit('finished-playing-ball','John');
emitter.emit('finished-playing-ball','Ann');

