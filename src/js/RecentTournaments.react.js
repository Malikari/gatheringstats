'use strict';

import React from 'react';
import {Link} from 'react-router-dom';
import Players from './Players.js';
import PlayerLink from './PlayerLink.react.js';
import {filterOnlyProTours, filterOnlyProLeagues, filterOnlyNationals, filterOnlyGrandPrix, filterOnlyOtherTournaments, filterOnlyArena} from './utils.js';
import { Helmet } from "react-helmet";
import PropTypes from 'prop-types';

const _ = require('underscore');
const Helper = require('./../../lib/helper.js');

const Logo = ({id, t}) => {
  if (!t.logo) {
    return null;
  }
  return (
    <Link to={'/tournament/' + id}>
      <picture>
        <source type={"image/webp"} srcSet={'/images/' + t.logo + ".webp"} />
        <source type={"image/png"} srcSet={'/images/' + t.logo + ".png"} />
        <img src={'/images/' + t.logo + ".png"} alt={"logo"}/>
      </picture>
    </Link>
  );
};

Logo.propTypes = {
  id: PropTypes.string,
  t: PropTypes.object
};

const RecentTournaments = ({ filter = filterOnlyProTours }) => (
  <div className="col-md-offset-3 col-md-6">
    <Helmet>
      <title>Gathering Stats</title>
    </Helmet>
    {_.map(window.Recent.filter(filter), function(tournament) {
      const id = tournament.id;
      return (
        <div key={id}>
          <div className="panel panel-default recentTournamentWrapper">
            <div className="panel-heading">
              <Link to={'/tournament/' + id}>{tournament.name}</Link>
            </div>
            <div className="panel-body recentTournament">
              <div className="row">
                <div className="col-sm-5">
                  <div className="image">
                    <Logo id={id} t={tournament} />
                    <p>
                      {tournament.formats.join(' / ')}
                      <br />
                      {tournament.medium}
                      <br />
                      {tournament.date}
                      <br />
                      {tournament.location}
                    </p>
                  </div>
                </div>
                <div className="col-sm-7">
                  <ul className="List">
                    {_.map(tournament.top, function(player, idx) {
                      idx = Helper.getPlayerIndex(idx, tournament.teamsize);
                      return (
                        <li
                          className={
                            idx === 0
                              ? 'List-item List-item--big'
                              : 'List-item '
                          }
                          key={player.id}
                        >
                          <span className="List-index">
                            {idx + 1}
                            {'. '}
                          </span>
                          <PlayerLink player={Players.byID(player.id)} />
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    })}
  </div>
);

RecentTournaments.propTypes = {
  filter: PropTypes.func
};

export const ProLeagues = (props) => {
  return (
    <RecentTournaments
      filter={filterOnlyProLeagues}
      {...props}
    />
  );
};

export const Nationals = (props) => {
  return (
    <RecentTournaments
      filter={filterOnlyNationals}
      {...props}
    />
  );
};

export const GrandPrix = (props) => {
  return (
    <RecentTournaments
      filter={filterOnlyGrandPrix}
      {...props}
    />
  );
};

export const OtherTournaments = (props) => {
  return (
    <RecentTournaments
      filter={filterOnlyOtherTournaments}
      {...props}
    />
  );
};

export const Arena = (props) => {
  return (
    <RecentTournaments
      filter={filterOnlyArena}
      {...props}
    />
  );
};

export default RecentTournaments;
