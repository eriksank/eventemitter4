//      EventEmitter4
//      Written by Erik Poupaert, Cambodia
//      (c) 2014
//      Licensed under the LGPL

_=require('underscore');

/**
 * Constructor. Creates an emitter object.
 */
function Emitter() { 

        if (!(this instanceof Emitter))
                throw "this function must be called with the new operator";
        
        this.init();

}

/**
 * Initializes the emitter's data structure.
 * Is called by the constructor and must be called by any class that inherits from this one.
 */
Emitter.prototype.init=function(listener) {
        this.listeners={};
        this.onceListeners={};
        this.listenersToAnyEvent=[];
        this.event=null;
}

Emitter.prototype.validateListener=function(listener) {
        if(!_.isFunction(listener))
                throw new Error('listener is not a function');
};

/**
 * Registers a listener function for a particular event.
 * @param {string} event The event for which to register the listener function.
 * @param {function} listener The listener function to register.
 * @returns {void} nothing.
 */
Emitter.prototype.on=function(event,listener) {
        this.validateListener(listener);
        if(!_(this.listeners).has(event)) this.listeners[event]=[];
        this.listeners[event].push(listener);
};

/**
 * Registers a listener function for a particular event. The listener will be triggered at most once.
 * @param {string} event The event for which to register the listener function.
 * @param {function} listener The listener function to register.
 * @returns {void} nothing.
 */
Emitter.prototype.once=function(event,listener) {
        this.validateListener(listener);
        if(!_(this.onceListeners).has(event)) this.onceListeners[event]=[];
        this.onceListeners[event].push(listener);
};

/**
 * Registers a listener function for all events.
 * The listener can retrieve what event it was called for from the emitter.event variable
 * @param {function} listener The listener function to register.
 * @returns {void} nothing.
 */
Emitter.prototype.onAny=function(listener) {
        this.validateListener(listener);
        this.listenersToAnyEvent.push(listener);        
};

/**
 * Emits an event and triggers the listeners registered for this event.
 * function(event, [arg1, arg2, arg3, ...])
 * @param {function} event The event to trigger.
 * @param {any} arg1,arg2,arg3,... Optional parameters that will be
                transmitted to the listener. As many parameters as needed can be transmitted.
 * @returns {void} nothing.
 */
Emitter.prototype.emit=function() {

        var args=_(arguments).toArray();
        this.event=args.shift();
        
        //notify the normal listeners
        if(_(this.listeners).has(this.event)) {
                this.listeners[this.event].forEach(function(listener){
                        listener.apply(this,args);
                });
        }
        
        //notify the once listeners
        if(_(this.onceListeners).has(this.event)) {
                this.onceListeners[this.event].forEach(function(listener){
                        listener.apply(this,args);
                });
                this.onceListeners=_(this.onceListeners).omit(this.event);
        }

        //notify the listeners to all events
        this.listenersToAnyEvent.forEach(function(listener){
                listener.apply(this,args);
        });

        this.event=null;

};

/**
 * Removes a listener for a particular event.
 * @param {string} event The event for which to remove the listener function.
 * @param {function} listener The listener function to remove.
 * @returns {void} nothing.
 */
Emitter.prototype.removeListener=function(event,listener) {

        //remove from the listeners to all events
        this.listenersToAnyEvent=_(this.listenersToAnyEvent).without(listener);

        //remove from the normal listeners
        if(_(this.listeners).has(event)) {
                this.listeners[event]=_(this.listeners[event]).without(listener);
                //if there are no listeners left for the event, remove it
                if(this.listeners[event].length===0)
                        this.listeners=_(this.listeners).omit(event);
        }

        //remove from the once listeners
        if(_(this.onceListeners).has(event)) {
                this.onceListeners[event]=_(this.onceListeners[event]).without(listener);
                //if there are no listeners left for the event, remove it
                if(this.onceListeners[event].length===0)
                        this.onceListeners=_(this.onceListeners).omit(event);
        }
}

/**
 * Removes a listener for a particular event or from all events
 * @param {string} [event] The event for which to remove the listener function. If left undefined, the listener will be removed for all events.
 * @returns {void} nothing.
 */
Emitter.prototype.removeAllListeners=function(event) {

        if(_.isUndefined(event)) {

                //reset all data structures
                this.init();

        } else {

                //remove from the normal listeners
                if(_(this.listeners).has(event)) 
                        this.listeners=_(this.listeners).omit(event);
                

                //remove from the once listeners
                if(_(this.onceListeners).has(event)) 
                        this.onceListeners[event]=_(this.onceListeners).omit(event);
                

        }
}

Emitter.prototype.tableToString=function(table) {
        var clone=_(table).clone();
        _(clone).each(function(listeners,key){
                clone[key]=listeners.length;
        })
        return JSON.stringify(clone);
}

/**
 * Dumps the current state of the emitter into string.
 * @returns {string} The current state of the emitter.
 */
Emitter.prototype.toString=function() {
        return '{"listeners":'+this.tableToString(this.listeners)+",\n"+
                '"onceListeners":'+this.tableToString(this.onceListeners)+",\n"+
                '"listenersToAnyEvent":'+this.listenersToAnyEvent.length+'}';
}



module.exports=Emitter;
