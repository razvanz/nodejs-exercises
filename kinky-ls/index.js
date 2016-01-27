'use strict';

const exec = require('child_process')
  .exec;

exec('ls', (err, stdout, stderr) => {
  if (err)
    console.log(`Something bad happened: ${stderr}`);
  else
    console.log(stdout.toString()
      .trim()
      .split('\n')
      .map((name) => {
        return `.${name}`;
      }));
});
