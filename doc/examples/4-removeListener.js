var EventEmitter=require('../../index.js');
var emitter=new EventEmitter();

//Mum
emitter.on('finished-eating',function(who) {
        console.log('clean up the table, '+who+'.');
});

var john=function(who) {
        if(who==='John')
                console.log('yes, mum');
};

//John
emitter.on('finished-eating',john);

emitter.emit('finished-eating','John');
emitter.removeListener('finished-eating',john);
emitter.emit('finished-eating','John');
emitter.emit('finished-eating','John');

