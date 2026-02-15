'use strict';

import React from 'react';
import { useState } from 'react';
import Players from './Players.js';
import PlayerLink from './PlayerLink.react.js';
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { nationGroups, seasons } from './utils.js';

function getPlayerStats(player, activeSeason) {
  var playerStats;

  if (activeSeason) {
    playerStats = {
      total:      (player.stats.totalbyyear   && player.stats.totalbyyear[activeSeason])      || 0,
      t1:         (player.stats.t1byyear      && player.stats.t1byyear[activeSeason])         || 0,
      t8:         (player.stats.t8byyear      && player.stats.t8byyear[activeSeason])         || 0,
      t16:        (player.stats.t16byyear     && player.stats.t16byyear[activeSeason])        || 0,
      points:     (player.stats.pointsbyyear  && player.stats.pointsbyyear[activeSeason])     || 0,
      amp:        (player.stats.ampbyyear     && player.stats.ampbyyear[activeSeason])        || 0,
      poy:        (player.stats.poybyyear     && player.stats.poybyyear[activeSeason])        || 0,
      gpt1:       (player.stats.gpt1byyear    && player.stats.gpt1byyear[activeSeason])       || 0,
      gpt8:       (player.stats.gpt8byyear    && player.stats.gpt8byyear[activeSeason])       || 0,
      money:      (player.stats.moneybyyear   && player.stats.moneybyyear[activeSeason])      || 0,
      topfinish:  (player.stats.topfinishbyyear && player.stats.topfinishbyyear[activeSeason])  || 0
    };
  } else {
    playerStats = {
      total:     player.stats.total,
      t1:        player.stats.t1,
      t8:        player.stats.t8,
      t16:       player.stats.t16,
      points:    player.stats.points,
      amp:       player.stats.amp,
      poy:       player.stats.poy,
      gpt1:      player.stats.gpt1,
      gpt8:      player.stats.gpt8,
      money:     player.stats.money,
      topfinish: player.stats.topfinish
    };
  }

  return playerStats;
}

const _ = require('underscore');
const accounting = require('accounting');

const Rankings = () => {
  const { col } = useParams();
  const [activeSeason, setActiveSeason] = useState(null);
  const [nationFilter, setNationFilter] = useState('');
  
  const nations = Object.keys(nationGroups);

  const preparedPlayers = _.map(window.Players, function(player) {
  var stats = getPlayerStats(player, activeSeason);

  return Object.assign({}, player, {
    _playerStats: stats,
    _sortValue: stats[col] || 0
    });
  });


  const filteredPlayers = _.chain(preparedPlayers)
    .filter(function(player) {
      if (!nationFilter || nationFilter === 'All') return true;
      var validNations = nationGroups[nationFilter] || [nationFilter];
      return validNations.includes(player.nationality);
    })
    .filter(function(player) {
      var v = player._playerStats[col];
      return v !== 'too few PTs' && v !== 'no Top 8s';
    })
    .value();

  const sortedPlayers = _.chain(filteredPlayers)
    .sortBy(function(player) {
      return -player._sortValue; // Minus for descending
    })
    .value();


  // Include anyone tied with the 100th rank
  const cutoffIndex = Math.min(99, sortedPlayers.length - 1);
  const cutoff = sortedPlayers.length > 0 ? sortedPlayers[cutoffIndex]._playerStats[col] : 0;
  const players = _.filter(sortedPlayers, function(p) {
    return activeSeason && cutoff == 0 ? p._playerStats[col] > cutoff : p._playerStats[col] >= cutoff;
  });

  const prev = {value: null};
  const sortImage = (<picture>
    <source type="image/webp" srcSet={"/images/arrowicon.webp"} />
    <source type="image/png" srcSet={"/images/arrowicon.png"} />
    <img src={"/images/arrowicon.png"} alt={"arrow"}/>
  </picture>);
  return (
    <div className="col-md-offset-2 col-md-8">
      <Helmet>
        <title>Player Rankings</title>
      </Helmet>
      <div className="page-header pageHeader">
        <h1>Player Rankings</h1>
      </div>

      <div className="season-select">
        <label htmlFor="seasonSelect">Select a season: </label>
        <select
          id="seasonSelect"
          value={activeSeason}
          onChange={e => setActiveSeason(e.target.value || null)}
        >
          {seasons.map(season => (
            <option key={season || "all"} value={season}>
              {season || "Alltime"}
            </option>
          ))}
        </select>
      </div>

      <div className="nation-filter">
        <label htmlFor="nationSelect">Filter players by nation or region: </label>
        <select
          id="nationSelect"
          value={nationFilter}
          onChange={e => setNationFilter(e.target.value)}
        >
          <option value="">All</option>
          {nations.map(nat => (
            <option key={nat} value={nat}>{nat}</option>
          ))}
        </select>
      </div>
      <table className="table table-hover sortable standingsTable">
        <thead>
          <tr>
            <th />
            <th>Player</th>
            <th className="sortableHeader">
              <Link to="/rankings/topfinish">Top Finishes</Link>
              {col === 'topfinish' ? sortImage : null}
            </th>
            <th className="sortableHeader">
              <Link to="/rankings/total">Total PTs</Link>
              {col === 'total' ? sortImage : null}
            </th>
            <th className="sortableHeader">
              <Link to="/rankings/t1">Wins</Link>
              {col === 't1' ? sortImage : null}
            </th>
            <th className="sortableHeader">
              <Link to="/rankings/t8">Top 8s</Link>
              {col === 't8' ? sortImage : null}
            </th>
            <th className="sortableHeader">
              <Link to="/rankings/t16">Top 16s</Link>
              {col === 't16' ? sortImage : null}
            </th>
            <th className="sortableHeader">
              <Link to="/rankings/points">Pro Points</Link>
              {col === 'points' ? sortImage : null}
            </th>
            <th className="sortableHeader">
              <Link to="/rankings/amp">AMP</Link>
              {col === 'amp' ? sortImage : null}
            </th>
            <th className="sortableHeader">
              <Link to="/rankings/poy">POY</Link>
              {col === 'poy' ? sortImage : null}
            </th>
            <th className="sortableHeader">
              <Link to="/rankings/gpt1">GPs won</Link>
              {col === 'gpt1' ? sortImage : null}
            </th>
            <th className="sortableHeader">
              <Link to="/rankings/gpt8">GP T8</Link>
              {col === 'gpt8' ? sortImage : null}
            </th>
            <th className="sortableHeader">
              <Link to="/rankings/money">Money</Link>
              {col === 'money' ? sortImage : null}
            </th>
            <th className="sortableHeader">
              <Link to="/rankings/t8pct">T8/Total (PT)</Link>
              {col === 't8pct' ? sortImage : null}
            </th>
          </tr>
        </thead>
        <tbody>
          {_.map(players, function(player, index) {
            if (prev.value !== player._playerStats[col]) {
              prev.value = player._playerStats[col];
              prev.index = index;
              ++index;
            } else {
              index = null;
            }

            var playerStats;

            if (activeSeason) {
              playerStats = {
                total:  (player.stats.totalbyyear  && player.stats.totalbyyear[activeSeason])  || 0,
                t1:     (player.stats.t1byyear     && player.stats.t1byyear[activeSeason])     || 0,
                t8:     (player.stats.t8byyear     && player.stats.t8byyear[activeSeason])     || 0,
                t16:    (player.stats.t16byyear    && player.stats.t16byyear[activeSeason])    || 0,
                points: (player.stats.pointsbyyear && player.stats.pointsbyyear[activeSeason]) || 0,
                amp:    (player.stats.ampbyyear    && player.stats.ampbyyear[activeSeason])    || 0,
                poy:    (player.stats.poybyyear    && player.stats.poybyyear[activeSeason])    || 0,
                gpt1:   (player.stats.gpt1byyear   && player.stats.gpt1byyear[activeSeason])   || 0,
                gpt8:   (player.stats.gpt8byyear   && player.stats.gpt8byyear[activeSeason])   || 0,
                money:  (player.stats.moneybyyear  && player.stats.moneybyyear[activeSeason])  || 0,
                topfinish:  (player.stats.topfinishbyyear  && player.stats.topfinishbyyear[activeSeason])  || 0
              };
            } else {
              playerStats = {
                total:  player.stats.total,
                t1:     player.stats.t1,
                t8:     player.stats.t8,
                t16:    player.stats.t16,
                points: player.stats.points,
                amp:    player.stats.amp,
                poy:    player.stats.poy,
                gpt1:   player.stats.gpt1,
                gpt8:   player.stats.gpt8,
                money:  player.stats.money,
                topfinish: player.stats.topfinish
              };
            }

            return (
              <tr key={player.id}>
                <td>{index}</td>
                <td>
                  <PlayerLink player={Players.byID(player.id)} />
                </td>
                <td>{playerStats.topfinish}</td>
                <td>{playerStats.total}</td>
                <td>{playerStats.t1}</td>
                <td>{playerStats.t8}</td>
                <td>{playerStats.t16}</td>
                <td>{playerStats.points}</td>
                <td>{playerStats.amp}</td>
                <td>{playerStats.poy}</td>
                <td>{playerStats.gpt1}</td>
                <td>{playerStats.gpt8}</td>
                <td>{accounting.formatMoney(playerStats.money, '$', 0)}</td>
                <td>{player.stats.t8pct}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Rankings;
