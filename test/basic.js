/// <reference path="../typings/mocha/mocha.d.ts"/>

var assert = require('assert');
var EventEmitter = require('events').EventEmitter;

var ebinder = require('../index');

describe("ebinder", function () {
	it("should return the emitter", function () {
		var emitter = new EventEmitter();
		
		assert(ebinder(emitter, {}) === emitter, "didn't return emitter");
	});
	
	it("should fire listeners", function (done) {
		var emitter = new EventEmitter();
		var object = {
			test: function() {
				done();
			}
		};
		
		ebinder(emitter, object);
		emitter.emit("test");
	});
	
	it("should bind to only functions", function (done) {
		var emitter = new EventEmitter();
		var object = {
			failure: true,
			num: 1,
			str: "",
			test: function() {
				done();
			}
		};
		
		ebinder(emitter, object);
		emitter.emit("failure");
		emitter.emit("test");
	});
	
	it("should respect emit arguments", function (done) {
		var emitter = new EventEmitter();
		var object = {
			test: function(arg1, arg2) {
				assert(arg1 === 1, "arg1 != 1");
				assert(arg2 === "two", "arg2 != 'two'");
				done();
			}
		};
		
		ebinder(emitter, object);
		emitter.emit("test", 1, "two");
	});
	
	it("should support prefix", function (done) {
		var emitter = new EventEmitter();
		var object = {
			test: function() {
				done();
			}
		};
		
		ebinder(emitter, object, "prefix");
		emitter.emit("prefix:test");
	});
	
	it("should throw when given invalid arguments", function () {
		assert.throws(function() {
			ebinder(1,{});
		}, function (err) {
			if ((err instanceof Error) && /emitter should be a/.test(err)) {
				return true;
			}
		}, "didn't throw given a number as emitter");
		
		assert.throws(function() {
			var e = new EventEmitter();
			ebinder(e,1);
		}, function (err) {
			if ((err instanceof Error) && /object should be a/.test(err)) {
				return true;
			}
		}, "didn't throw given a number as object");
	});
});