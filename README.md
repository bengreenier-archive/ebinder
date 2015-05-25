# ebinder

[![Build Status](https://travis-ci.org/bengreenier/ebinder.svg?branch=master)](https://travis-ci.org/bengreenier/ebinder)

a little module for batch binding to event emitters. just `npm install ebinder`.

# examples

```
var EventEmitter = require('events').EventEmitter;
var ebinder = require('ebinder');

var emitter = new EventEmitter();
var obj = {
	test: function(arg) {
		// arg == true
		// .. do something
	}
};

// returns emitter
ebinder(emitter, obj);
emitter.emit('test', true);
```

# api



# (emitter, object)

takes an `EventEmitter` and an `Object`, and for each property in the object that is of type `function`, we map it as a listener for an event on `emitter` by that name. Returns 'EventEmitter'.
