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
9.1\.  [Let's debunk a widespread fallacy](#let'sdebunkawidespreadfallacy)  
9.2\.  [underscore.js](#underscore.js)  
9.3\.  [Why not the standard nodejs EventEmitter](#whynotthestandardnodejseventemitter)  
9.4\.  [Why not EventEmitter2](#whynoteventemitter2)  
9.5\.  [Why not EventEmitter3](#whynoteventemitter3)  
10\.  [Contact](#contact)  
10.1\.  [Support](#support)  
10.2\.  [Projects](#projects)  
11\.  [Other publications](#otherpublications)  
12\.  [License](#license)  


<a name="synopsis"></a>

##1\. Synopsis
_EventEmitter4_ is an alternative to node's built-in _EventEmitter_ class, and to the existing alternatives [EventEmitter2](https://github.com/asyncly/EventEmitter2) and [EventEmitter3](https://github.com/3rd-Eden/EventEmitter3).

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

{{DRAFT}}

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

<a name="example3"></a>

### 4.4\. Example 3

For: _EventEmitter4.onAny(listener)_

**Program**

```javascript
var EventEmitter=require('eventemitter4');
var emitter=new EventEmitter();

emitter.on('finished-eating',function(who) {
        console.log('clean up the table, '+who+'.');
});

emitter.on('finished-playing-ball',function(who) {
        console.log('go, take a shower, '+who+'.');
});

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

<a name="example4"></a>

### 4.5\. Example 4

For: _EventEmitter4.removeListener(event,listener)_

**Program**

```javascript
var EventEmitter=require('eventemitter4');
var emitter=new EventEmitter();

emitter.on('finished-eating',function(who) {
        console.log('clean up the table, '+who+'.');
});

var john=function(who) {
        if(who==='John')
                console.log('yes, mum');
};

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

<a name="example5"></a>

### 4.6\. Example 5

For: _EventEmitter4.removeAllListeners([event])_

**Program**

```javascript
var EventEmitter=require('eventemitter4');
var emitter=new EventEmitter();

emitter.on('finished-eating',function() {
        console.log('clean up the table.');
});

emitter.on('finished-playing-ball',function(who) {
        console.log('go, take a shower.');
});

var john=function() {
        console.log('yes, mum (john)');
};

emitter.on('finished-eating',john);
emitter.on('finished-playing-ball',john);

var ann=function() {
        console.log('yes, mum (ann)');
};

emitter.on('finished-eating',ann);
emitter.on('finished-playing-ball',ann);

emitter.emit('finished-playing-ball');
emitter.removeAllListeners('finished-playing-ball');
emitter.emit('finished-playing-ball');
emitter.emit('finished-playing-ball');
emitter.emit('finished-eating');

```

**Output**

        go, take a shower.
        yes, mum (john)
        yes, mum (ann)
        clean up the table.
        yes, mum (john)
        yes, mum (ann)

<a name="example6"></a>

### 4.7\. Example 6

**Program**

For: _one possible way to inherit from EventEmitter4_

```javascript
var EventEmitter=require('eventemitter4');
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

```

**Output**

        giving order to John
        Yes, mum (John)
        giving order to Ann
        Yes, mum (Ann)

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

{{ DRAFT }}

<a name="let'sdebunkawidespreadfallacy"></a>

###9.1\. Let's debunk a widespread fallacy

http://en.wikipedia.org/wiki/Information_hiding
-information hiding: no need to know 

-only access through API

-- only to some extent true for users of the module
-- not true at all for extenders of the module
-- most users will also be extending eventemitter

- Even for users, it is not entirely true

-- debugging : console.log of the internal state or part of the internal state
-- a problem in your own program can often only be understood by looking at the corrupted state of an external module
-- you must be able to dump the internal state of this module
-- it should have a .toString() method

<a name="underscore.js"></a>

###9.2\. underscore.js

- Building EventEmitter --> almost trivial 
- set algebra (functional programming)
==> not relational algebra!
- when debugging your own code, the code of the external module matters

much easier to read
much easier for other people to help fixing bugs and offer pull requests

- performance: relegated to underscore.js
==> now it is their problem

<a name="whynotthestandardnodejseventemitter"></a>

###9.3\. Why not the standard nodejs EventEmitter
- no onAny

<a name="whynoteventemitter2"></a>

###9.4\. Why not EventEmitter2
- has onAny
- Too much functionality: on('foo.*')
==> hard to debug

<a name="whynoteventemitter3"></a>

###9.5\. Why not EventEmitter3
- no onAny

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

