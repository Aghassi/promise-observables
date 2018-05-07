import execa from 'execa';
import listr from 'Listr';
import split from 'split';
import streamToObservable from 'stream-to-observable';
require('any-observable/register/rxjs-all');
import Observable from 'any-observable';

const exec = (cmd, args) => {
	// Use `Observable` support if merged https://github.com/sindresorhus/execa/pull/26
	const cp = execa(cmd, args);

	return Observable.merge(
		streamToObservable(cp.stdout.pipe(split()), {await: cp}),
		streamToObservable(cp.stderr.pipe(split()), {await: cp})
	).filter(Boolean);
};


new listr([
      {
            title: "Promise error",
            task:() => exec('np', ['1.2.3.4'])
      }
]).run();