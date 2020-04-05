'use strict';

const webp = require('imagemin-webp');
module.exports = {
  options: {
    use: [
      webp({quality: 50})
    ]
  },
  dynamic: {
    files: [{
      cwd: 'build/images',
      expand: true,
      src: ['**/*.png'],
      dest: 'build/images',
      ext: '.webp'
    }]
  }
};
