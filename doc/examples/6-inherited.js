var EventEmitter=require('../../index.js');
var _=require('underscore');

function Mum() { 

        if (!(this instanceof Mum))
                throw "this function must be called with the new operator";
        
        this.init();
}

_.extend(Mum.prototype,EventEmitter.prototype);
Mum.prototype.parentInit=EventEmitter.prototype.init;

Mum.prototype.init=function() {
        this.parentInit();
        this.whatever='I am mum';        
}

Mum.prototype.reactToFinishedEating=function() {

        console.log('giving order to John');
        this.emit('give-order-to-kid','John');

        console.log('giving order to Ann');
        this.emit('give-order-to-kid','Ann');
}

var mum=new Mum();

mum.on('give-order-to-kid',function(who) {
        if(who==='John')
                console.log('Yes, mum (John)');
});

mum.on('give-order-to-kid',function(who) {
        if(who==='Ann')
                console.log('Yes, mum (Ann)');
});

mum.reactToFinishedEating();

