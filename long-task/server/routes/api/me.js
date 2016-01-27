'use strict';

const meCtrl = require('../../controllers/api/me');

module.exports = function (app) {
  app.route('/api/me/')
    .get(meCtrl);
};
