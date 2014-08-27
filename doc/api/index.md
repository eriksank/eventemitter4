

<!-- Start index.js -->

### Emitter()

Constructor. Creates an emitter object.

### init()

Initializes the emitter's data structure.
Is called by the constructor and must be called by any class that inherits from this one.

### on(event, listener)

Registers a listener function for a particular event.

_Params_ 

* **string** *event* The event for which to register the listener function.
* **function** *listener* The listener function to register.

### once(event, listener)

Registers a listener function for a particular event. The listener will be triggered at most once.

_Params_ 

* **string** *event* The event for which to register the listener function.
* **function** *listener* The listener function to register.

### onAny(listener)

Registers a listener function for all events.
The listener can retrieve what event it was called for from the emitter.event variable

_Params_ 

* **function** *listener* The listener function to register.

### emit(event, arg1,arg2,arg3,...)

Emits an event and triggers the listeners registered for this event.
function(event, [arg1, arg2, arg3, ...])

_Params_ 

* **function** *event* The event to trigger.
* **any** *arg1,arg2,arg3,...* Optional parameters that will be                 transmitted to the listener. As many parameters as needed can be transmitted.

### removeListener(event, listener)

Removes a listener for a particular event.

_Params_ 

* **string** *event* The event for which to remove the listener function.
* **function** *listener* The listener function to remove.

### removeAllListeners([event])

Removes a listener for a particular event or from all events

_Params_ 

* **string** *[event]* The event for which to remove the listener function. If left undefined, the listener will be removed for all events.

### toString()

Dumps the current state of the emitter into string.

<!-- End index.js -->

