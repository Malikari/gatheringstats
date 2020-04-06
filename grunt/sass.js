'use strict';

const sass = require('node-sass');
module.exports = {
  options: {
    implementation: sass,
    outputStyle: 'compressed'
  },
  all: {
    files: {
      'build/css/app.css': 'src/css/app.scss'
    }
  }
};
