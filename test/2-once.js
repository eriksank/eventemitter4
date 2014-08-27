var assert=require('assert');
var EventEmitter=require('../index.js');
var emitter=new EventEmitter();

describe('once', function(){
        it('should trigger a "once" listener only once', function(done){

                var timesCalled=0;
                emitter.once('finished-eating',function(who) {
                        assert.equal(who,'John');
                        timesCalled++;
                });

                emitter.emit('finished-eating','John');
                emitter.emit('finished-eating','John');
                emitter.emit('finished-eating','John');

                setTimeout(function() {
                        if(timesCalled!==1)
                                throw "the listener was not triggered only once; times called:"+timesCalled;
                        done();
                });

        });
});

