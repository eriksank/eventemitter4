var EventEmitter=require('../../index.js');
var emitter=new EventEmitter();

//Mum
emitter.on('finished-eating',function() {
        console.log('clean up the table.');
});

//Mum
emitter.on('finished-playing-ball',function(who) {
        console.log('go, take a shower.');
});

var john=function() {
        console.log('yes, mum (john)');
};

//John
emitter.on('finished-eating',john);
emitter.on('finished-playing-ball',john);

var ann=function() {
        console.log('yes, mum (ann)');
};

//Ann
emitter.on('finished-eating',ann);
emitter.on('finished-playing-ball',ann);

emitter.emit('finished-playing-ball');
emitter.removeAllListeners('finished-playing-ball');
console.log('-- Mum, John and Ann now stop listening to the finished-playing-ball event.'+
        ' They still listen to the finished-eating event. --');
emitter.emit('finished-playing-ball'); //in vain
emitter.emit('finished-playing-ball'); //in vain
emitter.emit('finished-eating');

