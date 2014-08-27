var assert=require('assert');
var EventEmitter=require('../index.js');
var emitter=new EventEmitter();

describe('onAny', function(){
        it('should trigger the listener on all events', function(done){

                var timesCalled=0;
                emitter.onAny(function(who) {
                        timesCalled++;                
                });

                emitter.emit('finished-eating','John');
                emitter.emit('finished-playing-ball','John');
                emitter.emit('finished-playing-ball','Ann');

                setTimeout(function() {
                        if(timesCalled!==3)
                                throw "the listener was not called 3 times but "+timesCalled+" times";
                        done();
                });


        });
});

