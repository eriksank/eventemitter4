var assert=require('assert');
var EventEmitter=require('../index.js');
var emitter=new EventEmitter();

describe('removeListener', function(){
        it('should remove all listeners for an event successfully', function(done){

                var timesCalled=0;

                emitter.on('finished-eating',function() {
                        timesCalled++;
                });

                emitter.on('finished-playing-ball',function() {
                        timesCalled++;
                });

                emitter.on('finished-playing-ball',function() {
                        timesCalled++;
                });

                emitter.emit('finished-playing-ball'); //2
                emitter.emit('finished-playing-ball'); //4
                emitter.emit('finished-eating');  //5
                //tally=5
                emitter.removeAllListeners('finished-playing-ball');
                emitter.emit('finished-playing-ball'); //5
                emitter.emit('finished-playing-ball'); //5
                emitter.emit('finished-eating'); //tally=6

                setTimeout(function() {
                        if(timesCalled!==6)
                                throw "the listener was not called 1 time but "+timesCalled+" times";
                        done();
                });

        });
});

