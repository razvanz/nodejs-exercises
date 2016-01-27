/*eslint no-sync: 0*/
'use strict';

const _ = require('lodash');
const async = require('async');
const glob = require('glob');

class Config {
  constructor(options) {
    _.assign(this, Config.DEFAULTS);

    options = options || {};
    _.assign(this, options);
  }

  getJS() {
    return this.getGlobbedFiles(_.union(this.assets.lib.js,
      this.assets.js), this.root);
  }

  getCSS() {
    return this.getGlobbedFiles(_.union(this.assets.lib.css,
      this.assets.css), this.root);
  }

  getGlobbedFiles(patterns, removeRoot, cb) {
    let sync = false;

    if (typeof removeRoot === 'function') {
      cb = removeRoot;
      removeRoot = false;
    }

    if (typeof cb !== 'function')
      sync = true;

    if (sync)
      return this.getGlobbedFilesSync(patterns, removeRoot);

    return this.getGlobbedFilesAsync(patterns, removeRoot, cb);
  }

  getGlobbedFilesSync(patterns, removeRoot) {
    let result = [];

    if (!(patterns instanceof Array))
      patterns = [patterns];

    patterns = _.flattenDeep(patterns);

    for (let i = 0; i < patterns.length; i++)
      result = _.union(result, this._spliceFromPaths(glob.sync(patterns[i], {
        sync: true
      }), removeRoot));

    return result;
  }

  getGlobbedFilesAsync(patterns, removeRoot, cb) {
    const self = this;

    if (typeof removeRoot === 'function') {
      cb = removeRoot;
      removeRoot = false;
    }

    if (!(patterns instanceof Array))
      patterns = [patterns];

    patterns = _.flattenDeep(patterns);

    return async.eachSeries(patterns, (pattern, done) => {
      return glob(patterns, (err, files) => {
        if (err)
          return done(err);

        return self._spliceFromPaths(files, removeRoot);
      });
    }, (err, paths) => {
      if (err)
        return cb(err);

      return cb(null, _.flattenDeep(paths));
    });
  }

  _spliceFromPaths(paths, splice) {
    if (!splice)
      return paths;

    return paths.map((filePath) => {
      return filePath.replace(splice, '');
    });
  }

  static get DEFAULTS() {
    return {
      title: 'Web server',
      host: process.env.HOST || '127.0.0.1',
      port: process.env.PORT || 3000,
      templateEngine: 'swig',
      root: 'client/',
      assets: {
        lib: {
          css: ['client/lib/*.css'],
          js: [
            'client/lib/angular.js',
            'client/lib/*.js'
          ]
        },
        css: ['client/style/style.css'],
        js: [
          'client/app/app.js',
          'client/app/**/*.js'
        ]
      }
    };
  }
}

module.exports = Config;
