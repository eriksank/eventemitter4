var EventEmitter=require('../../index.js');
var _=require('underscore');

function Mum() { 

        if (!(this instanceof Mum))
                throw "this function must be called with the new operator";
        
        this.init();
}

//extend Mum with EventEmitter
_.extend(Mum.prototype,EventEmitter.prototype);

//Calls the parent init() function
Mum.prototype.init=function() {
        EventEmitter.prototype.init.call(this);
        this.whatever='I am mum';        
}

//This function configures Mum to give orders
Mum.prototype.givesOrdersToKids=function() {

        console.log('giving order to John');
        this.emit('give-order-to-kid','John');

        console.log('giving order to Ann');
        this.emit('give-order-to-kid','Ann');
}

var mum=new Mum();

//John
mum.on('give-order-to-kid',function(who) {
        if(who==='John')
                console.log('Yes, mum (John)');
});

//Ann
mum.on('give-order-to-kid',function(who) {
        if(who==='Ann')
                console.log('Yes, mum (Ann)');
});

//
mum.givesOrdersToKids();

