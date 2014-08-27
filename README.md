#EventEmitter4

1\.  [Synopsis](#synopsis)  
2\.  [Installation](#installation)  
3\.  [Browser support](#browsersupport)  
4\.  [Examples](#examples)  
4.1\.  [Running the examples](#runningtheexamples)  
4.2\.  [Example 1](#example1)  
4.3\.  [Example 2](#example2)  
4.4\.  [Example 3](#example3)  
4.5\.  [Example 4](#example4)  
4.6\.  [Example 5](#example5)  
4.7\.  [Example 6](#example6)  
4.8\.  [Example 7](#example7)  
5\.  [API](#api)  
5.1\.  [Emitter()](#emitter)  
5.2\.  [init()](#init)  
5.3\.  [on(event, listener)](#oneventlistener)  
5.4\.  [once(event, listener)](#onceeventlistener)  
5.5\.  [onAny(listener)](#onanylistener)  
5.6\.  [emit(event, arg1,arg2,arg3,...)](#emiteventarg1arg2arg3...)  
5.7\.  [removeListener(event, listener)](#removelistenereventlistener)  
5.8\.  [removeAllListeners([event])](#removealllisteners[event])  
5.9\.  [toString()](#tostring)  
6\.  [Development tools](#developmenttools)  
7\.  [Building](#building)  
8\.  [Testing](#testing)  
9\.  [Why EventEmitter4](#whyeventemitter4)  
9.1\.  [Let us first debunk a common myth](#letusfirstdebunkacommonmyth)  
9.2\.  [underscore.js](#underscore.js)  
9.3\.  [Concerning performance](#concerningperformance)  
9.4\.  [Why not the standard nodejs EventEmitter](#whynotthestandardnodejseventemitter)  
9.5\.  [Why not EventEmitter2](#whynoteventemitter2)  
9.6\.  [Why not EventEmitter3](#whynoteventemitter3)  
10\.  [Contact](#contact)  
10.1\.  [Support](#support)  
10.2\.  [Projects](#projects)  
11\.  [Other publications](#otherpublications)  
12\.  [License](#license)  


<a name="synopsis"></a>

##1\. Synopsis
_EventEmitter4_ is an alternative to node's built-in [EventEmitter](http://nodejs.org/api/events.html) class, and to the existing alternatives [EventEmitter2](https://github.com/asyncly/EventEmitter2) and [EventEmitter3](https://github.com/3rd-Eden/EventEmitter3).

<a name="installation"></a>

##2\. Installation

You can install _EventEmitter4_ with *npm*:

```bash
npm install eventemitter4
```

<a name="browsersupport"></a>

##3\. Browser support
The module comes with a _browserified_ version:

        browser-support/eventemitter4-bundle.js

And a minimized version thereof:

        browser-support/eventemitter4-bundle.min.js

<a name="examples"></a>

##4\. Examples

<a name="runningtheexamples"></a>

### 4.1\. Running the examples

Open a terminal. In order to run for example, example 1:

```bash
cd myproject/node_modules/eventemitter4
node doc/examples/1-on.js
```

<a name="example1"></a>

### 4.2\. Example 1

For: _EventEmitter4.on(event,listener)_

**Program**

```javascript
var EventEmitter=require('eventemitter4');
var emitter=new EventEmitter();

emitter.on('finished-eating',function(who) {
        console.log('clean up the table, '+who+'.');
});

emitter.emit('finished-eating','John');

```

**Output**

        clean up the table, John.

Any function registered `on` an event will be triggered when the emitter invokes the `emit` function with that particular event.

<a name="example2"></a>

### 4.3\. Example 2

**Program**

For: _EventEmitter4.once(event,listener)_

```javascript
var EventEmitter=require('eventemitter4');
var emitter=new EventEmitter();

emitter.once('finished-eating',function(who) {
        console.log('clean up the table, '+who+'.');
});

emitter.emit('finished-eating','John');
emitter.emit('finished-eating','John');
emitter.emit('finished-eating','John');

```
**Output**

        clean up the table, John.

After triggering a listener registered with `once`, it will fire one time for the event. After that it won't fire any longer.

<a name="example3"></a>

### 4.4\. Example 3

For: _EventEmitter4.onAny(listener)_

**Program**

```javascript
var EventEmitter=require('eventemitter4');
var emitter=new EventEmitter();

//mum
emitter.on('finished-eating',function(who) {
        console.log('clean up the table, '+who+'.');
});

//mum
emitter.on('finished-playing-ball',function(who) {
        console.log('go, take a shower, '+who+'.');
});

//john
emitter.onAny(function(who) {
        if(who==='John')
                console.log('yes, mum');
});

emitter.emit('finished-eating','John');
emitter.emit('finished-playing-ball','John');
emitter.emit('finished-playing-ball','Ann');

```

**Output**

        clean up the table, John.
        yes, mum
        go, take a shower, John.
        yes, mum
        go, take a shower, Ann.

On a particular event, _Mum_ will issue an instruction for _John_, while _John_ is registered to listen to any message. So, he hears everything. However, because of the _if_-clause, he only responds to events for which the argument _who_ is _John_. Note that listeners are invoked in the order in which they were registered. Listeners to any event are triggered after all listeners to a particular event.

<a name="example4"></a>

### 4.5\. Example 4

For: _EventEmitter4.removeListener(event,listener)_

**Program**

```javascript
var EventEmitter=require('eventemitter4');
var emitter=new EventEmitter();

//Mum
emitter.on('finished-eating',function(who) {
        console.log('clean up the table, '+who+'.');
});

var john=function(who) {
        if(who==='John')
                console.log('yes, mum');
};

//John
emitter.on('finished-eating',john);

emitter.emit('finished-eating','John');
emitter.removeListener('finished-eating',john);
emitter.emit('finished-eating','John');
emitter.emit('finished-eating','John');

```

**Output**

        clean up the table, John.
        yes, mum
        clean up the table, John.
        clean up the table, John.


Both _Mum_ and _John_ is registered for the event. The first time he receives the event he responds. After that, he stops listening and no longer responds. In this example, the result is in fact the same as using the _once_ function.

<a name="example5"></a>

### 4.6\. Example 5

For: _EventEmitter4.removeAllListeners([event])_

**Program**

```javascript
var EventEmitter=require('eventemitter4');
var emitter=new EventEmitter();

//Mum
emitter.on('finished-eating',function() {
        console.log('clean up the table.');
});

//Mum
emitter.on('finished-playing-ball',function(who) {
        console.log('go, take a shower.');
});

var john=function() {
        console.log('yes, mum (john)');
};

//John
emitter.on('finished-eating',john);
emitter.on('finished-playing-ball',john);

var ann=function() {
        console.log('yes, mum (ann)');
};

//Ann
emitter.on('finished-eating',ann);
emitter.on('finished-playing-ball',ann);

emitter.emit('finished-playing-ball');
emitter.removeAllListeners('finished-playing-ball');
console.log('-- Both John and Ann stop listening now to the finished-playing-ball event'+
        ' but they still listen to the finished-eating event --');
emitter.emit('finished-playing-ball'); //in vain
emitter.emit('finished-playing-ball'); //in vain
emitter.emit('finished-eating');

```

**Output**

        go, take a shower.
        yes, mum (john)
        yes, mum (ann)
        -- Both John and Ann stop listening now to the finished-playing-ball event but they still listen to the finished-eating event --
        clean up the table.
        yes, mum (john)
        yes, mum (ann)

<a name="example6"></a>

### 4.7\. Example 6

**Program**

For: _just one possible way to inherit from EventEmitter4_

```javascript
var EventEmitter=require('eventemitter4');
var _=require('underscore');

function Mum() { 

        if (!(this instanceof Mum))
                throw "this function must be called with the new operator";
        
        this.init();
}

//extend Mum with EventEmitter
_.extend(Mum.prototype,EventEmitter.prototype);
//Keep track of the parentInit function
Mum.prototype.parentInit=EventEmitter.prototype.init;

//Calls the parent init() function
Mum.prototype.init=function() {
        this.parentInit();
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

```

**Output**

        giving order to John
        Yes, mum (John)
        giving order to Ann
        Yes, mum (Ann)

There are many ways to organize inheritance in Javascript. In this one, we use _underscorejs_ to extend the prototype of the inheriting class with the functions of the parent class.

<a name="example7"></a>

### 4.8\. Example 7

**Program**

For: _EventEmitter4.toString()_

```javascript
var EventEmitter=require('eventemitter4');
var emitter=new EventEmitter();

emitter.on('finished-eating',function() {});
emitter.on('finished-eating',function() {});
emitter.on('finished-eating',function() {});
emitter.on('finished-playing-ball',function() {});

console.log(emitter.toString());

```

**Output**

        {"listeners":{"finished-eating":3,"finished-playing-ball":1},
        "onceListeners":{},
        "listenersToAnyEvent":0}

After registering 4 listeners on 2 different events, you can see in the internal state of the emitter for which events there are listeners registered. This should help with debugging situations in which you expected something else.


<a name="api"></a>

##5\. API



<!-- Start index.js -->

<a name="emitter"></a>

### 5.1\. Emitter()

Constructor. Creates an emitter object.

<a name="init"></a>

### 5.2\. init()

Initializes the emitter's data structure.
Is called by the constructor and must be called by any class that inherits from this one.

<a name="oneventlistener"></a>

### 5.3\. on(event, listener)

Registers a listener function for a particular event.

_Params_ 

* **string** *event* The event for which to register the listener function.
* **function** *listener* The listener function to register.

<a name="onceeventlistener"></a>

### 5.4\. once(event, listener)

Registers a listener function for a particular event. The listener will be triggered at most once.

_Params_ 

* **string** *event* The event for which to register the listener function.
* **function** *listener* The listener function to register.

<a name="onanylistener"></a>

### 5.5\. onAny(listener)

Registers a listener function for all events.
The listener can retrieve what event it was called for from the emitter.event variable

_Params_ 

* **function** *listener* The listener function to register.

<a name="emiteventarg1arg2arg3..."></a>

### 5.6\. emit(event, arg1,arg2,arg3,...)

Emits an event and triggers the listeners registered for this event.
function(event, [arg1, arg2, arg3, ...])

_Params_ 

* **function** *event* The event to trigger.
* **any** *arg1,arg2,arg3,...* Optional parameters that will be                 transmitted to the listener. As many parameters as needed can be transmitted.

<a name="removelistenereventlistener"></a>

### 5.7\. removeListener(event, listener)

Removes a listener for a particular event.

_Params_ 

* **string** *event* The event for which to remove the listener function.
* **function** *listener* The listener function to remove.

<a name="removealllisteners[event]"></a>

### 5.8\. removeAllListeners([event])

Removes a listener for a particular event or from all events

_Params_ 

* **string** *[event]* The event for which to remove the listener function. If left undefined, the listener will be removed for all events.

<a name="tostring"></a>

### 5.9\. toString()

Dumps the current state of the emitter into string.

<!-- End index.js -->


<a name="developmenttools"></a>

##6\. Development tools

* browser support: [browserify](https://github.com/substack/node-browserify), [uglifyjs](https://github.com/mishoo/UglifyJS)
* Unit tests: [mocha](https://github.com/visionmedia/mocha)
* Documentation: [markdox](https://github.com/cbou/markdox), [markdown-pp.py](https://github.com/jreese/markdown-pp)

<a name="building"></a>

## 7\. Building

Execute the `build.sh` script to re-build the project from sources. It will re-generate the browser support files and the documentation.

<a name="testing"></a>

## 8\. Testing

Open a terminal and use _mocha_ to run the unit tests:

```bash
cd node_modules/eventemitter4
mocha
```

<a name="whyeventemitter4"></a>

##9\. Why EventEmitter4

The main reason why I wrote _EventEmitter4_ is that I had run into an untractable bug in my own program and that the only way to solve the problem was by dumping the internal state of the emitter class that I was using, that is, _EventEmitter2_. Achieving this was very hard. That is the main reason why the bug was very hard to solve. If I ever run into a serious issue in my own program again, I do not want to go through this again.

<a name="letusfirstdebunkacommonmyth"></a>

###9.1\. Let us first debunk a common myth

The idea behind the [information hiding](http://en.wikipedia.org/wiki/Information_hiding) concept is that users of a module should only know about the functions listed in the module's API. This is true, until there are bugs either in your own program or in the external module.

The bugs in your own program may very well cause the module's private variables to be in a state that you did not expect. You may not be able to detect this just be looking at the internal state of your own program. You will need to have a close look at the internal state of the module. If there is no way in which the API of the module can expose its full state to you, you may be unable to solve the bug in your own program.

It is well known that debugging _EventEmitter_ issues in your own program can be seriously tricky. That is why the _EventEmitter4_ class implements a _toString()_ function that dumps a summary of its internal state.

If you use the _EventEmitter4_ class, you'd better know that it stores its ordinary listeners in an object in which each key is an event, and in which each entry contains an array of listener functions. The once-only listeners are stored in exactly the same way. The listeners to all events are just stored in an array. The numbers that you can see in the internal state dump of _EventEmitter4_, are just a count of the listener functions that it contains in that particular array.

When you only _use_ the module, you may still be able to get away without understanding how its internal state is stored and what the values are at any point in time, but when you need to extend the module, this is usually no longer true. Your own functions will probably have to manipulate that internal state too.

Most users of any _EventEmitter_ class will actually be extending it by inheriting it in their own classes.

Therefore, the idea that they do not need to know how the internal storage of the _EventEmitter_ class works, is not particularly true. Furthermore, from the issue lists in the other projects, you can easily see that these users want to add more functions to the _EventEmitter_ class. It would be better if they could actually do that by themselves. Most of these feature requests are only applicable to very specific situations. There would be no point in burdening the core project with such sometimes very ideosyncratic requirements.

<a name="underscore.js"></a>

###9.2\. underscore.js

When using a library like [underscore.js](http://underscorejs.org), it is almost trivial to manage the internal data structure of a class like _EventEmitter4_.

Some people call a tool like _underscore.js_ a tool of functional programming. It is true that probably all of its functions are [idempotent](http://en.wikipedia.org/wiki/Idempotence) and therefore do not keep internal state. That part is indeed the same what functional programming languages try to achieve, but functional programming tends to be much more than that.

In my opinion, _underscore.js_ is better termed as an implementation of _set algebra_. It pretty much does the same as SQL, but then just on one table. The main difference between _underscore.js_ and SQL, is that _underscore.js_ does not implement functions for dealing with the [cartesian product](http://en.wikipedia.org/wiki/Cartesian_product), that is, _joining_ multiple sets.

The use of set algebra often turns functions that deal with tree data structures into one-liners. Since _EventEmitter_ only deals with a tree of two levels, it is even a relatively simple data structure. The use of set algebra is therefore results in suprisingly short programs, that are at the same time, usually much easier to read.

This means that you can easily put _console.log()_ statements in the module's source code, if you ever need it. Furthermore, this also means that it is much easier for other people to help fixing bugs and offer pull requests.

<a name="concerningperformance"></a>

###9.3\. Concerning performance

Since all statements are calls into _underscore.js_, it relegates any performance issue to that module. _EventEmitter4_ has no performance characteristics on its own.

Furthermore, I strongly suspect that the performance for _underscore.js_ -- I haven't had time or a pressing need to read its source code up till now -- is mostly relegated to the performance of the implementation of _Object_ and _Array_ classes in nodejs and, since it repeatedly uses function invocations, the Javascript engine's minimization of overhead in function calls.

The responsibility for those areas falls squarely onto the Google v8 team. If they manage to improve it, they do not just improve it for _EventEmitter4_ but for all possible modules and applications at the same time.


In other words, one reason why an alternative _EventEmitter_ implementation could be fundamentally faster than _EventEmitter4_, is that it uses faster data structures than the standard _Object_ and _Array_ classes. The _EventEmitter2_ and _EventEmitter3_ libraries definitely don't do this.

Painstakingly spelling out data manipulations manually, as they do, instead of using set algebra, will not make their programs any faster. It will just bloat the source code and make it more difficult to read. 

If alternative implementations are faster, it could also mean that they use fewer function invocations, and that function invocation goes along with a lot of overhead, and therefore would suffer a performance penalty in NodeJS. But then again, in that case all NodeJS code would be affected.

Typical NodeJS code is replete with listeners functions and callback functions. There would be no point in trying to fix such problem just in _EventEmitter4_. Performance in ultra-simple code such as _EventEmitter4_ is something that can only be improved at lower levels.

<a name="whynotthestandardnodejseventemitter"></a>

###9.4\. Why not the standard nodejs EventEmitter

I really needed an `onAny()` function in my project. The standard nodejs _EventEmitter_ class does not implement it. At the same time, the internal data structure of the standard _EventEmitter_ class is particularly not documented anywhere, as far as I know. This kind of modules is usually full of (and often useless) performance hacks that render the source code unintelligible. 

<a name="whynoteventemitter2"></a>

###9.5\. Why not EventEmitter2

_EventEmitter2_ does have an `onAny` function. However, there is no way to dump the state of its emitter objects. Because it also supports wildcards, such as `on('foo.*')`, the source code is rather complicated to figure out.

I managed to place `console.log()` statements to detect a bug in my own program, but it was unnecessarily hard. The module is also replete with performance optimizations of which I do not think that they do anything for performance at all, but they still manage to further complicate the situation.

In my opinion, there is actually no reasonable justification for implementing the `on('foo.*')` functionality. You can just use `onAny()` and trivially skip the events that you do not need:

```javascript
onAny(function() {

        if(!/foo\.*/.test(emitter.event)) return;

        //remainder of your listener code

});
```

Is it really necessary to tremendously complicate the source code of the module in order to implement this? 

<a name="whynoteventemitter3"></a>

###9.6\. Why not EventEmitter3

_EventEmitter3_ does not have an `onAny` function. It is not implemented using any form of set algebra either.

Therefore, instead of (probably) painstakingly figuring out how to extend any of the alternative _EventEmitter_ classes, I made the decision to roll my own.

<a name="contact"></a>

## 10\. Contact

<a name="support"></a>

###10.1\. Support
For trouble tickets with _EventEmitter4_, please, use the github [issue list](https://github.com/eriksank/eventemitter4/issues).

<a name="projects"></a>

###10.2\. Projects
I am available for commercial projects.

In commercial projects, I often do the initial prototyping by myself. After that, I manage external developer contributions through github and bitbucket. I usually end up being the long-term go-to person for how to evolve the system. My work involves reviewing Javascript for both the web and nodejs. I occasionally still do PHP. The startups I work for, are usually located elsewhere, but I do all of my work from Cambodia. If you are in need of a source code manager or quality assurance person for your project, feel free to contact me at erik@sankuru.biz.

<a name="otherpublications"></a>

##11\. Other publications

* At [github.com](https://github.com/eriksank)
* At [www.npmjs.org](https://www.npmjs.org/~eriksank)

<a name="license"></a>

##12\. License

        RPC Websocket
        Written by Erik Poupaert, Cambodia
        (c) 2014
        Licensed under the LGPL

