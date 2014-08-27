var EventEmitter=require('../../index.js');
var emitter=new EventEmitter();

emitter.on('finished-eating',function() {});
emitter.on('finished-eating',function() {});
emitter.on('finished-eating',function() {});
emitter.on('finished-playing-ball',function() {});

console.log(emitter.toString());

