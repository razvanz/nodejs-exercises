/*eslint global-require: 0*/
'use strict';

const bodyParser = require('body-parser');
const chalk = require('chalk');
const compress = require('compression');
const consolidate = require('consolidate');
const cookieParser = require('cookie-parser');
const express = require('express');
const http = require('http');
const methodOverride = require('method-override');
const morgan = require('morgan');
const path = require('path');

const Config = require('./Config');
const config = new Config();

// Initialize express app
const app = express();

// Setting application local variables
app.locals.title = config.title;
app.locals.version = config.version;
app.locals.description = config.description;
app.locals.keywords = config.keywords;
app.locals.jsFiles = config.getJS();
app.locals.cssFiles = config.getCSS();
app.locals.cache = 'memory';

// Passing the request url to environment locals
app.use((req, res, next) => {
  res.locals.url = `${req.protocol}://${req.headers.host}${req.url}`;
  next();
});

app.use(morgan('dev'));

// Should be placed before express.static
app.use(compress({
  filter: function (req, res) {
    return (/json|text|javascript|css/)
      .test(res.getHeader('Content-Type'));
  },
  level: 9
}));

// Set swig as the template engine
app.engine('html', consolidate[config.templateEngine]);

// Set views path and view engine
app.set('view engine', 'html');
app.set('views', `./server/views`);

// Request body parsing middleware should be above methodOverride
app.use(bodyParser.urlencoded({
  extended: true,
  limit: '25mb'
}));
app.use(bodyParser.json({
  limit: '25mb'
}));

app.use(methodOverride());
app.enable('jsonp callback');

// CookieParser should be above session
app.use(cookieParser());

app.use(express.static(path.resolve(config.root)));

// Register routes
const useRoutes = require('./routes/');
useRoutes(app);

// Send error as JSON
app.use((err, req, res, next) => {
  if (!res.headerSent)
    return res.status(err.statusCode || 500)
      .jsonp({
        name: err.name,
        message: err.message
      });
});

// No route matches
app.use((req, res) => {
  if (!res.headerSent)
    return res.status(404)
      .render('4xx', {
        path: req.path
      });
});

const httpServer = new http.Server(app);

httpServer.listen(config.port, config.host, (e) => {
  if (e)
    throw e;

  console.log(`\n${chalk.bold.bgGreen('Server started!')}`);
  console.log(`Host:\t\t\t\t${chalk.bold.green(config.host)}`);
  console.log(`Port:\t\t\t\t${chalk.bold.green(config.port)}\n`);
});
