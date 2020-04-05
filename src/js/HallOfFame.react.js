'use strict';

import React from 'react';
import {Link, useParams} from 'react-router-dom';
import Players from './Players.js';
import PlayerLink from './PlayerLink.react.js';
import HallOfFameIcon from './HallOfFameIcon.react.js';
import { Helmet } from "react-helmet";

const _ = require('underscore');
const accounting = require('accounting');

const HallOfFame = () => {
  let col = useParams().col;
  const players = _.chain(window.Players)
    .values()
    .filter(player => player.hof != null)
    .sortBy(player => -Number(String(player.stats[col]).replace(/[^\d]/, '')))
    .value();

  const prev = {value: null};
  const sortImage = (<picture>
    <source type={"image/webp"} srcSet={"/images/arrowicon.webp"} />
    <source type={"image/png"} srcSet={"/images/arrowicon.png"} />
    <img src={"/images/arrowicon.png"} alt={"arrow"}/>
  </picture>);
  return (
    <div className="col-md-offset-2 col-md-8">
      <Helmet>
        <title>Hall of Fame</title>
      </Helmet>
      <div className="page-header pageHeader">
        <h1>Hall of Fame <HallOfFameIcon /></h1>
      </div>
      <table className="table table-hover sortable standingsTable">
        <thead>
        <tr>
          <th>Player</th>
          <th className="sortableHeader">
            <Link to="/hall-of-fame/year">Class (Year)</Link>
            {col === 'year' ? sortImage : null}
          </th>
          <th className="sortableHeader">
            <Link to="/hall-of-fame/rank">Ballot Rank</Link>
            {col === 'rank' ? sortImage : null}
          </th>
          <th className="sortableHeader">
            <Link to="/hall-of-fame/total">Total PTs</Link>
            {col === 'total' ? sortImage : null}
          </th>
          <th className="sortableHeader">
            <Link to="/hall-of-fame/t1">Wins</Link>
            {col === 't1' ? sortImage : null}
          </th>
          <th className="sortableHeader">
            <Link to="/hall-of-fame/t8">Top 8s</Link>
            {col === 't8' ? sortImage : null}
          </th>
          <th className="sortableHeader">
            <Link to="/hall-of-fame/points">Pro Points</Link>
            {col === 'points' ? sortImage : null}
          </th>
          <th className="sortableHeader">
            <Link to="/hall-of-fame/mythicpoints">Mythic Points</Link>
            {col === 'mythicpoints' ? sortImage : null}
          </th>
          <th className="sortableHeader">
            <Link to="/hall-of-fame/money">Money</Link>
            {col === 'money' ? sortImage : null}
          </th>
          <th className="sortableHeader">
            <Link to="/hall-of-fame/t8pct">T8/Total</Link>
            {col === 't8pct' ? sortImage : null}
          </th>
        </tr>
        </thead>
        <tbody className="hallOfFame">
        {_.map(players, function(player, index) {
          if (prev.value !== player.stats[col]) {
            prev.value = player.stats[col];
            prev.index = index;
            ++index;
          } else {
            index = null;
          }
          return (
            <tr key={player.id}>
              <td>
                <PlayerLink player={Players.byID(player.id)} />
              </td>
              <td>{player.stats.year}</td>
              <td>{player.stats.rank}</td>
              <td>{player.stats.total}</td>
              <td>{player.stats.t1}</td>
              <td>{player.stats.t8}</td>
              <td>{player.stats.points}</td>
              <td>{player.stats.mythicpoints}</td>
              <td>{accounting.formatMoney(player.stats.money, '$', 0)}</td>
              <td>{player.stats.t8pct}</td>
            </tr>
          );
        })}
        </tbody>
      </table>
    </div>
  );
}
export default HallOfFame;
