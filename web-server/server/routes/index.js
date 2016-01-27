'use strict';

module.exports = function (app) {
  app.route('/')
    .get((req, res) => {
      return res.render('app');
    });

  require('./api/me')(app);
};
