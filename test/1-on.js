var assert=require('assert');
var EventEmitter=require('../index.js');
var emitter=new EventEmitter();

describe('on', function(){
        it('should trigger the event listeners registered with "on"', function(done){

                emitter.on('finished-eating',function(who) {
                        assert.equal(who,'John');
                        done();
                });

                emitter.emit('finished-eating','John');

        });
});

