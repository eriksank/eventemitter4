var assert=require('assert');
var EventEmitter=require('../index.js');
var emitter=new EventEmitter();

describe('toString', function(){
        it('should print the internal state of the emitter successfully', function(){

                emitter.on('finished-eating',function() {});
                emitter.on('finished-eating',function() {});
                emitter.on('finished-eating',function() {});
                emitter.on('finished-playing-ball',function() {});

                var expectedState='{"listeners":{"finished-eating":3,"finished-playing-ball":1},'+"\n"+
                        '"onceListeners":{},'+"\n"+
                        '"listenersToAnyEvent":0}';

                assert.equal(emitter.toString(),expectedState);                

        });
});

