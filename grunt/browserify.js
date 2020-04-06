'use strict';

module.exports = {
  dev: {
    files: {
      'build/js/app.js': ['src/js/*.js']
    },
    options: {
      debug: true,
      transform: [['babelify', {presets: ['@babel/env', '@babel/react']}]],
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
        ['babelify', {presets: ['@babel/env', '@babel/react']}],
        'uglifyify'
      ],
      extensions: ['js']
    }
  }
};
