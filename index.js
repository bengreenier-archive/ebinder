var assert = require('assert');
var EventEmitter = require('events').EventEmitter;

function ebinder (emitter, object) {
	assert(emitter instanceof EventEmitter, "emitter should be an EventEmitter");
	assert(typeof(object) === "object", "object should be an Object");
	
	for (var prop in object) {
		if (object.hasOwnProperty(prop) && typeof(object[prop]) === "function") {
			emitter.on(prop, object[prop]);
		}
	}
	
	return emitter;
}

// export the function
module.exports = ebinder;