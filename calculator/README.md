Calculator
==========

Create a web server that performs mathematical operations based on user input in the request url and responds to the request with the result.

Hints:

-	Use [example](https://nodejs.org/en/about/) for creating a web server
-	Use [eval](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval) for performing the calculation

Test solution
-------------

Start server:

```
nodejs-exercises $ node calculator/server.js
Server running at http://127.0.0.1:3000/

```

Use `cUrl` to perform the request (browser could also be used):

```
nodejs-exercises $ curl "http://127.0.0.1:3000?(1+2)*3"
9
```
