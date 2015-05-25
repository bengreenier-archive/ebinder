var assert = require('assert');
var EventEmitter = require('events').EventEmitter;

function ebinder (emitter, object, optionalPrefix) {
	assert(emitter instanceof EventEmitter, "emitter should be an EventEmitter");
	assert(typeof(object) === "object", "object should be an Object");
	
	var prefix = "";
	if (typeof(optionalPrefix) !== "undefined") {
		assert(typeof(optionalPrefix) === "string", "optionalPrefix should be a string");
		prefix = optionalPrefix+":";
	}
	
	for (var prop in object) {
		if (object.hasOwnProperty(prop) && typeof(object[prop]) === "function") {
			emitter.on(prefix+prop, object[prop]);
		}
	}
	
	return emitter;
}

// export the function
module.exports = ebinder;