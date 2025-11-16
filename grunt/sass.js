'use strict';

const sass = require('sass');
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
