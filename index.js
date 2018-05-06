import execa from 'execa';
import listr from 'Listr';
import split from 'split';
import streamToObservable from 'stream-to-observable';
import { Observable } from 'rxjs';

const run = (cmd, args) => {
   const cp = execa(cmd, args);

   return Observable
      .merge(
         streamToObservable(cp.stdout.pipe(split()), { await: cp }),
         streamToObservable(cp.stderr.pipe(split()), { await: cp })
      )
      .filter(Boolean);
}


new listr([
      {
            title: "Promise error",
            task:() => {
                  run('np', ['--dry-run']);
            }
      }
]).run();