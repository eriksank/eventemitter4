var EventEmitter=require('../../index.js');
var emitter=new EventEmitter();

emitter.on('finished-eating',function() {
        console.log('clean up the table.');
});

emitter.on('finished-playing-ball',function(who) {
        console.log('go, take a shower.');
});

var john=function() {
        console.log('yes, mum (john)');
};

emitter.on('finished-eating',john);
emitter.on('finished-playing-ball',john);

var ann=function() {
        console.log('yes, mum (ann)');
};

emitter.on('finished-eating',ann);
emitter.on('finished-playing-ball',ann);

emitter.emit('finished-playing-ball');
emitter.removeAllListeners('finished-playing-ball');
emitter.emit('finished-playing-ball');
emitter.emit('finished-playing-ball');
emitter.emit('finished-eating');

