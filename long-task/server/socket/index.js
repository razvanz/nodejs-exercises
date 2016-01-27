'use strict';

const exec = require('child_process').exec;

module.exports = function (io) {
  io.on('connection', (socket) => {

    socket.on('start:ping', startPing);

    // Handlers
    function startPing(options) {
      options = options || {};
      const count = options.count || 10;
      const host = options.host || '127.0.0.1';

      exec(`ping -c ${count} -i 10 ${host}`, {
        timeout: 2 * 60 * 1000
      }, (err, stdout, stderr) => {
        if (err)
          return pingError(err);
        else if(stderr.toString())
          return pingError(new Error(stderr.toString()));

        return pingSuccess(stdout.toString());
      });
    }

    function pingError(err) {
      socket.emit('ping:error', err.message);
    }

    function pingSuccess(output) {
      socket.emit('ping:success', output);
    }
  });
};
