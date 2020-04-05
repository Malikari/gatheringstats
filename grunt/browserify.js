'use strict';

module.exports = {
  dev: {
    files: {
      'build/js/app.js': ['src/js/*.js']
    },
    options: {
      debug: true,
      transform: [['babelify', {presets: ['es2015', 'env', 'react']}]],
      extensions: ['js']
    }
  },
  dist: {
    files: {
      'build/js/app.js': ['src/js/*.js']
    },
    options: {
      debug: false,
      transform: [
        ['babelify', {presets: ['es2015', 'env', 'react']}],
        'uglifyify'
      ],
      extensions: ['js']
    }
  }
};
