'use strict';

module.exports = {
  all: {
    files: [
      {
        src: 'src/index.html',
        dest: 'build/index.html'
      },
      {
        src: 'src/index.html',
        dest: 'build/404.html'
      },
      {
        expand: true,
        cwd: 'src/',
        src: 'css/*.css',
        dest: 'build/'
      },
      {
        src: 'src/CNAME',
        dest: 'build/CNAME'
      }
    ]
  },
  flags: {
    files: [
      {
        expand: true,
        cwd: 'src/',
        src: 'flags/**/*.svg',
        dest: 'build/'
      }
    ]
  },
  images: {
    files: [
      {
        expand: true,
        cwd: 'data/',
        src: 'images/*.png',
        dest: 'build/raw/'
      }
    ]
  }
};
