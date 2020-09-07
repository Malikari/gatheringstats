'use strict';

var _ = require('underscore');
var deepcopy = require('deepcopy');
var Helper = require('./../lib/helper.js');
var unidecode = require('unidecode');
var sharp = require("sharp");

module.exports = function(grunt) {
  function nameToID(name) {
    return unidecode(name)
      .toLowerCase()
      .replace(/[^a-z-]/g, '-');
  }

  var _tournaments = null;
  function loadTournaments() {
    if (_tournaments) {
      return _tournaments;
    }
    _tournaments = {};
    var countries = loadCountries();
    grunt.file.recurse('./data/', function(abspath, rootdir, subdir, filename) {
      if (
        filename.endsWith('.json') &&
      //  !filename.startsWith('grand-prix') && // This was excluding Grand Prix. Turned on for now.
        filename !== 'players.json' &&
        filename !== 'countries.json'
      ) {
        var tid = filename.replace('.json', '');
        _tournaments[tid] = grunt.file.readJSON(abspath);
        _tournaments[tid].standings = _.map(
          _tournaments[tid].standings,
          function(p) {
            p.id = nameToID(p.name);
            if (p.nationality) {
                if (!countries[p.nationality]) {
                  grunt.log.writeln(
                    'Invalid country code: ' +
                    p.nationality +
                    ' for player ' +
                    p.id
                  );
                } else {
                  p.flag = countries[p.nationality][
                    'alpha-2'
                    ].toLowerCase();
                  // Show the full name instead of the short code.
                  p.nationality = countries[p.nationality].name;
              }
            }
            return p;
          }
        );
      }
    });
    return _tournaments;
  }

  function jsonToStr(json) {
    return JSON.stringify(json, null, 4);
  }

  function buildTournaments() {
    grunt.file.write(
      './build/data/tournaments.js',
      'window.Tournaments = ' + jsonToStr(loadTournaments())
    );
  }

  function buildRecent() {
    var tournaments = loadTournaments();
    var list = [];
    _.each(tournaments, function(tournament) {
      let topN = 8;
      if (tournament.teamsize > 1) {
        topN = tournament.teamsize * 4;
      }
      topN = tournament.topn || topN;
      var recent = deepcopy(tournament);
      recent.top = recent.standings.slice(0, topN);
      delete recent.standings;
      list.push(recent);
    });
    grunt.file.write(
      './build/data/recent.js',
      'window.Recent = ' +
        jsonToStr(
          _.sortBy(list, function(item) {
            return -Helper.getDate(item.date);
          })
        )
    );
  }

  var _players = null;
  function loadPlayers() {
    if (_players) {
      return _players;
    }
    var tournaments = loadTournaments();
    var players = {};
    _.each(tournaments, function(tournament) {
      var standings = tournament.standings;
      _.each(standings, function(standing, index) {
        if (!(standing.id in players)) {
          players[standing.id] = {
            id: standing.id,
            name: standing.name,
            tournaments: [],
            stats: {
              money: 0,
              points: 0,
              mythicpoints: 0,
              playerspoints: 0,
              total: 0,
              t1: 0,
              t8: 0,
              t16: 0,
              gptotal: 0,
              gpt1: 0,
              gpt8: 0
            }
          };
        }
        var finish = Helper.getPlayerIndex(index, tournament.teamsize) + 1;
        var t = {
          finish: finish,
          propoints: standing.propoints,
          mythicpoints: standing.mythicpoints,
          tid: tournament.id,
          money: standing.money,
          type: tournament.type || ''
        };
        if (standing.rank) {
          t.rank = standing.rank;
        }
        players[standing.id].tournaments.push(t);
        players[standing.id].stats.money += standing.money || 0;
        players[standing.id].stats.points += standing.propoints || 0;
        players[standing.id].stats.mythicpoints += standing.mythicpoints || 0;
        players[standing.id].stats.playerspoints += standing.playerspoints || 0;

        // Only PTs are included in the stats below (count, T1, T8, T16)
        if (tournament.type == 'Pro Tour') {
          ++players[standing.id].stats.total;
          if (finish === 1) {
            ++players[standing.id].stats.t1;
          }
          if (
            (tournament.teamsize > 1 && finish <= 4) ||
            (tournament.teamsize == 1 && finish <= 8)
          ) {
            ++players[standing.id].stats.t8;
          }
          if (
            (tournament.teamsize > 1 && finish <= 8) ||
            (tournament.teamsize == 1 && finish <= 16)
          ) {
            ++players[standing.id].stats.t16;
          }
        }
        else if (tournament.type == 'Grand Prix') {
          ++players[standing.id].stats.gptotal;
          if (finish === 1) {
            ++players[standing.id].stats.gpt1;
          }
          if (
            (tournament.teamsize > 1 && finish <= 4) ||
            (tournament.teamsize == 1 && finish <= 8)
          ) {
            ++players[standing.id].stats.gpt8;
          }
        }
        else {
          return;
        }
      });
    });
    players = _.mapObject(players, function(player) {
      if (player.stats.t8 > 0 && player.stats.total >= 10) {
        player.stats.t8pct =
          Math.floor(100 * player.stats.t8 / player.stats.total) + '%';
      } else if (player.stats.t8 == 0 ) {
        player.stats.t8pct = 'no Top 8s';
      } else {
        player.stats.t8pct = 'too few PTs';
      }
      return {
        id: player.id,
        name: player.name,
        tournaments: _.sortBy(player.tournaments, function(tournament) {
          return -Helper.getDate(tournaments[tournament.tid].date);
        }),
        stats: player.stats
      };
    });
    _players = players;
    return _players;
  }

  function loadCountries() {
    // Generate a mapping of three letter code to two letter code
    var countries = grunt.file.readJSON('./data/countries.json');
    var ret = {};
    for (var country of countries) {
      ret[country['alpha-3']] = country;
    }
    return ret;
  }

  function buildPlayers() {
    var players = loadPlayers();
    var metadata = grunt.file.readJSON('./data/players.json');
    var countries = loadCountries();
    for (var p in players) {
      var id = players[p].id;
      if (metadata[id] && Object.keys(metadata[id]).length > 0) {
        for (var k in metadata[id]) {
          players[p][k] = metadata[id][k];
        }
        if (players[p].nationality) {
          if (!countries[players[p].nationality]) {
            grunt.log.writeln(
              'Invalid country code: ' +
                players[p].nationality +
                ' for player ' +
                id
            );
          } else {
            players[p].flag = countries[players[p].nationality][
              'alpha-2'
            ].toLowerCase();
            // Show the full name instead of the short code.
            players[p].nationality = countries[players[p].nationality].name;
          }
        }
        if (typeof players[p].mpl !== "undefined" || typeof players[p].rvl !== "undefined") {
          if (typeof players[p].mpl !== "undefined" && players[p].mpl.includes(2020)) {
            players[p].activeBadge = 'mpl';
          } else if (typeof players[p].rvl !== "undefined" && players[p].rvl.includes(2020)) {
            players[p].activeBadge = 'rvl';
          } else if (typeof players[p].mpl !== "undefined") {
            players[p].activeBadge = 'formermpl';
          } else if (typeof players[p].rvl !== "undefined") {
            players[p].activeBadge = 'formerrvl';
          }
        }

      }
    }
    grunt.file.write(
      './build/data/players.js',
      'window.Players = ' + jsonToStr(players)
    );
  }

  function buildMetadata() {
    var players = loadPlayers();
    var metadata = grunt.file.readJSON('./data/players.json');
    _.each(players, function(player) {
      if (!metadata[player.id]) {
        grunt.log.writeln(
          'Adding player: ' + player.name + ' (' + player.id + ')'
        );
        metadata[player.id] = {};
      }
    });
    _.each(metadata, function(player, id) {
      if (!players[id]) {
        grunt.log.writeln('Removing player: ' + id);
        delete metadata[id];
      }
    });
    grunt.file.write('./data/players.json', jsonToStr(metadata));
  }

  function doResize() {
    grunt.file.mkdir('./build/images');
    grunt.file.recurse('./build/raw/images', function(abspath, rootdir, subdir, filename) {
      if (filename.endsWith('.png')) {
        if (filename === "arrowicon.png") {
          sharp(abspath)
            .resize(16, 16)
            .toFile(`./build/images/${filename}`)
            .catch(err => grunt.log.writeln("Error " + err + ", processing: " + filename));
        } else {
          sharp(abspath)
            .resize({height: 80})
            .toFile(`./build/images/${filename}`)
            .catch(err => grunt.log.writeln("Error " + err + ", processing: " + filename));
        }
      } else {
        grunt.log.writeln("Non-png found: " + filename);
      }
    });
  }

  return {
    js: ['eslint', 'browserify:dev'],
    jsProd: ['eslint', 'browserify:dist'],
    css: ['sass'],
    json: ['jsonlint'],
    tournaments: buildTournaments,
    players: buildPlayers,
    recent: buildRecent,
    metadata: buildMetadata,
    resize: doResize,
    'build-data': ['tournaments', 'players', 'recent'],
    default: ['build-data', 'copy', 'resize', 'css', 'js', 'json', 'imagemin:dynamic'],
    dist: ['build-data', 'copy', 'resize', 'css', 'jsProd', 'json', 'imagemin:dynamic'],
    serve: ['default', 'connect'],
    prod: ['env:production', 'dist', 'uglify']
  };
};
