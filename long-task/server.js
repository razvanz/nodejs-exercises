'use strict';

const chalk = require('chalk');

process.on('uncaughtException', (err) => {
  // Making sure we catch all exception for debuging purposes
  console.log(chalk.red('Uncaught Exception: %s \n%s'),
    err.message,
    err.stack);

  process.exit(1);
});

// Starts the app
require('./server/');
