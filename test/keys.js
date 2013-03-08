(function(buster, when, keys) {

var assert, fail, resolve, reject, sentinel;

assert = buster.assert;
fail = buster.assertions.fail;

resolve = when.resolve;
reject = when.reject;

sentinel = {};

buster.testCase('when/keys', {

	'all': {
		'should resolve input values': function(done) {
			var input = { a: 1, b: 2, c: 3 };
			keys.all(input).then(
				function(results) {
					assert.equals(results, input);
				},
				fail
			).always(done);
		},

		'should resolve promised keys': function(done) {
			var input = { a: resolve(1), b: 2, c: resolve(3) };
			keys.all(input).then(
				function(results) {
					assert.equals(results, { a: 1, b: 2, c: 3 });
				},
				fail
			).always(done);
		},

		'should resolve promise for keys': function(done) {
			var input = { a: resolve(1), b: 2, c: resolve(3) };
			keys.all(resolve(input)).then(
				function(results) {
					assert.equals(results, { a: 1, b: 2, c: 3 });
				},
				fail
			).always(done);
		},

		'should reject if key rejects': function(done) {
			var input = { a: 1, b: reject(sentinel), c: 3 };
			keys.all(input).then(
				fail,
				function(e) {
					assert.same(e, sentinel);
				}
			).always(done);
		},

		'should reject if input promise rejects': function(done) {
			keys.all(reject(sentinel)).then(
				fail,
				function(e) {
					assert.same(e, sentinel);
				}
			).always(done);
		}

	},

	'map': {
		'should map keys': function(done) {
			var input = { a: 1, b: 2, c: 3 };
			keys.map(input, function(x) {
				return x + 1;
			}).then(
				function(results) {
					assert.equals(results, { a: 2, b: 3, c: 4 });
				},
				fail
			).always(done);
		},

		'should map promised keys': function(done) {
			var input = { a: resolve(1), b: 2, c: resolve(3) };
			keys.map(input, function(x) {
				return x + 1;
			}).then(
				function(results) {
					assert.equals(results, { a: 2, b: 3, c: 4 });
				},
				fail
			).always(done);
		},

		'should map promise for keys': function(done) {
			var input = { a: resolve(1), b: 2, c: resolve(3) };
			keys.map(resolve(input), function(x) {
				return x + 1;
			}).then(
				function(results) {
					assert.equals(results, { a: 2, b: 3, c: 4 });
				},
				fail
			).always(done);
		},

		'should reject if key rejects': function(done) {
			var input = { a: 1, b: reject(sentinel), c: 3 };
			keys.map(input, function(x) {
				return x + 1;
			}).then(
				fail,
				function(e) {
					assert.same(e, sentinel);
				}
			).always(done);
		},

		'should reject if input promise rejects': function(done) {
			keys.map(reject(sentinel), function(x) {
				return x + 1;
			}).then(
				fail,
				function(e) {
					assert.same(e, sentinel);
				}
			).always(done);
		},

		'should reject if reduceFunc rejects': function(done) {
			var input = { a: 1, b: 2, c: 3 };
			keys.map(input, function() {
				return reject(sentinel);
			}, 0).then(
				fail,
				function(e) {
					assert.same(e, sentinel);
				}
			).always(done);
		},

		'should reject if reduceFunc throws': function(done) {
			var input = { a: 1, b: 2, c: 3 };
			keys.map(input, function() {
				throw sentinel;
			}, 0).then(
				fail,
				function(e) {
					assert.same(e, sentinel);
				}
			).always(done);
		}


	},

	'reduce': {
		'should reduce keys': function(done) {
			var input = { a: 1, b: 2, c: 3 };
			keys.reduce(input, function(result, val) {
				return result + val;
			}, 0).then(
				function(result) {
					assert.equals(result, 6);
				},
				fail
			).always(done);
		},

		'should reduce promised keys': function(done) {
			var input = { a: resolve(1), b: 2, c: resolve(3) };
			keys.reduce(input, function(result, val) {
				return result + val;
			}, 0).then(
				function(result) {
					assert.equals(result, 6);
				},
				fail
			).always(done);
		},

		'should reduce promise for input keys': function(done) {
			var input = { a: resolve(1), b: 2, c: resolve(3) };
			keys.reduce(resolve(input), function(result, val) {
				return result + val;
			}, 0).then(
				function(result) {
					assert.equals(result, 6);
				},
				fail
			).always(done);
		},

		'should reject if key rejects': function(done) {
			var input = { a: 1, b: reject(sentinel), c: 3 };
			keys.reduce(input, function(result, val) {
				return result + val;
			}, 0).then(
				fail,
				function(e) {
					assert.same(e, sentinel);
				}
			).always(done);
		},

		'should reject if input promise rejects': function(done) {
			keys.reduce(reject(sentinel), function(result, val) {
				return result + val;
			}, 0).then(
				fail,
				function(e) {
					assert.same(e, sentinel);
				}
			).always(done);
		},

		'should reject if reduceFunc rejects': function(done) {
			var input = { a: 1, b: 2, c: 3 };
			keys.reduce(input, function() {
				return reject(sentinel);
			}, 0).then(
				fail,
				function(e) {
					assert.same(e, sentinel);
				}
			).always(done);
		},

		'should reject if reduceFunc throws': function(done) {
			var input = { a: 1, b: 2, c: 3 };
			keys.reduce(input, function() {
				throw sentinel;
			}, 0).then(
				fail,
				function(e) {
					assert.same(e, sentinel);
				}
			).always(done);
		}

	}

});
})(
	this.buster     || require('buster'),
	this.when       || require('../when'),
	this.when_keys || require('../keys')
);
