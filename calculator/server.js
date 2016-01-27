'use strict';

const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  let operation = null;
  let result = null;

  operation = req.url.substring(
    req.url.indexOf('?') + 1
  );

  try {
    result = `${eval(operation)}\n`;
  } catch (e) {
    res.writeHead(400, {
      'Content-Type': 'text/plain'
    });
    return res.end('Unable to calculate');
  }

  res.writeHead(200, {
    'Content-Type': 'text/plain'
  });
  res.end(result);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
