var _ = require('underscore');
var deepcopy = require('deepcopy');

var TOURNAMENTS_PATH = './data/tournaments.json';

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: ['build/*'],

    copy: {
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
            src: 'src/ptlogo.png',
            dest: 'build/logo/ptlogo.png'
          },
          {
            src: 'src/CNAME',
            dest: 'build/CNAME'
          }
        ]
      },
      logos: {
        files: [
          {
            expand: true,
            cwd: 'data/',
            src: 'logo/*.png',
            dest: 'build/',
          }
        ],
      },
      data: {
        files: [
          {
            src: 'data/tournaments.json',
            dest: 'build/data/tournaments.js',
          }
        ],
        options: {
          process: function(data, path) {
            path = path.replace('data/', '');
            path = path.replace('.json', '');
            arg = path.charAt(0).toUpperCase() + path.slice(1);
            return 'window.' + arg + ' = ' + data + ';';
          },
        }
      }
    },

    sass: {
      all: {
        options: {
          outputStyle: 'compressed'
        },
        files: {
          'build/css/app.css': 'src/css/app.scss'
        }
      }
    },

    jshint: {
      all: ['src/**/*.js', 'src/**/*.jsx'],
      options: {
        browser: true,
        jquery: true,
        node: true,
        strict: true
      }
    },

    jsonlint: {
      all: {
        src: [
          'data/tournaments.json',
        ]
      }
    },

    browserify: {
      all: {
        files: {
          'build/js/app.js' : ['src/js/*.js', 'src/js/*.jsx']
        }
      },
      options: {
        transform: [ require('grunt-react').browserify ],
        extensions: ['js', 'jsx']
      }
    },

    uglify: {
      all: {
        files: {
          'build/js/app.js' : ['build/js/app.js'],
          'build/data/players.js' : ['build/data/players.js'],
          'build/data/recent.js' : ['build/data/recent.js'],
          'build/data/tournaments.js' : ['build/data/tournaments.js']
        }
      }
    },

    'gh-pages': {
      options: {
        base: 'build'
      },
      src: '**/*'
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-jsxhint');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-gh-pages');
  grunt.loadNpmTasks('grunt-jsonlint');

  grunt.registerTask('js', ['jshint', 'browserify']);
  grunt.registerTask('css', ['sass']);
  grunt.registerTask('json', ['jsonlint']);
  grunt.registerTask('build-data', ['players', 'recent']);
  grunt.registerTask('default', ['build-data', 'copy', 'css', 'js', 'json',]);
  grunt.registerTask('prod', ['default', 'uglify', 'gh-pages']);

  function loadTournaments() {
    if (!grunt.file.exists(TOURNAMENTS_PATH)) {
      grunt.log.error("file " + TOURNAMENTS_PATH + " not found");
      return false;
    }
    return grunt.file.readJSON(TOURNAMENTS_PATH);
  }

  function getDate(date) {
    var year = date.substr(-4);
    var month = date.match(/\w+/)[0].substr(0, 3);
    var day = date.match(/\d+/)[0];
    return Date.parse(month + ' ' + day + ', ' + year);
  }

  function jsonToStr(json) {
    return JSON.stringify(json, null, 4);
  }

  grunt.registerTask('recent', function(key, value) {
    var tournaments = loadTournaments();
    var list = [];
    _.each(tournaments, function(tournament) {
      var topN = tournament.team ? 12 : 8;
      var recent = deepcopy(tournament);
      recent.top = recent.standings.slice(0, topN);
      delete recent.standings;
      list.push(recent);
    });
    grunt.file.write(
      './build/data/recent.js',
      'window.Recent = ' +
      jsonToStr(
        _.sortBy(list, function(item) { return -getDate(item.date); })
      )
    );

  });

  grunt.registerTask('players', function (key, value) {
    var tournaments = loadTournaments();
    var players = {};
    var calculateFinish = function(index, team, team2hg) {
      var persons;

      if (team && team2hg) {
        persons = 2;
      } else if (team) {
        persons = 3;
      } else {
        persons = 1;
      }

      return Math.floor(index / persons) + 1;
    };

    _.each(tournaments, function(tournament) {
      var standings = tournament.standings;

      _.each(standings, function(standing, index) {

        if (!(standing.id in players)) {
          players[standing.id] = {
            id: standing.id,
            name: standing.name,
            tournaments: []
          };
        }

        players[standing.id].tournaments.push({
          finish: calculateFinish(index, tournament.team, tournament.team2hg),
          propoints: standing.propoints,
          tid: tournament.id,
          money: standing.money
        });
      })
    });

    players = _.mapObject(players, function(player) {
      return {
        id: player.id,
        name: player.name,
        tournaments: _.sortBy(player.tournaments, function(tournament) {
          return -getDate(tournaments[tournament.tid].date);
        })
      };
    });

    grunt.file.write('./build/data/players.js', 'window.Players = ' + jsonToStr(players));
  });
}
