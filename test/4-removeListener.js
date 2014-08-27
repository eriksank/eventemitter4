var assert=require('assert');
var EventEmitter=require('../index.js');
var emitter=new EventEmitter();

describe('removeListener', function(){
        it('should remove the listener successfully', function(done){

                var timesCalled=0;
                var john=function(who) {
                        timesCalled++;
                };

                emitter.on('finished-eating',john);
                emitter.emit('finished-eating','John');
                emitter.removeListener('finished-eating',john);
                emitter.emit('finished-eating','John');
                emitter.emit('finished-eating','John');

                setTimeout(function() {
                        if(timesCalled!==1)
                                throw "the listener was not called 1 time but "+timesCalled+" times";
                        done();
                });


        });
});

