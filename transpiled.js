'use strict';

var _execa = require('execa');

var _execa2 = _interopRequireDefault(_execa);

var _Listr = require('Listr');

var _Listr2 = _interopRequireDefault(_Listr);

var _split = require('split');

var _split2 = _interopRequireDefault(_split);

var _streamToObservable = require('stream-to-observable');

var _streamToObservable2 = _interopRequireDefault(_streamToObservable);

var _anyObservable = require('any-observable');

var _anyObservable2 = _interopRequireDefault(_anyObservable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('any-observable/register/rxjs-all');


var exec = function exec(cmd, args) {
	// Use `Observable` support if merged https://github.com/sindresorhus/execa/pull/26
	var cp = (0, _execa2.default)(cmd, args);

	return _anyObservable2.default.merge((0, _streamToObservable2.default)(cp.stdout.pipe((0, _split2.default)()), { await: cp }), (0, _streamToObservable2.default)(cp.stderr.pipe((0, _split2.default)()), { await: cp })).filter(Boolean);
};

new _Listr2.default([{
	title: "Promise error",
	task: function task() {
		return exec('np', ['1.2.3.4']);
	}
}]).run();
