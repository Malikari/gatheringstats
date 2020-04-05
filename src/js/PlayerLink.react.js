'use strict';

import React from 'react';
import {Link} from 'react-router-dom';
import Flag from './Flag.react.js';
import HallOfFameIcon from './HallOfFameIcon.react.js';
import PlayerBadge from './PlayerBadge.react';
import PropTypes from 'prop-types';

const PlayerLink = ({player, hideFlag, countryOverrides}) => (
  <span>
    {player.flag && !hideFlag ? (
      <Flag flag={countryOverrides ? countryOverrides.flag : player.flag}
            nationality={countryOverrides ? countryOverrides.nationality : player.nationality}
      />
    ) : null}
    <Link to={'/player/' + player.id}>{player.name}</Link>
    {player.hof ? <HallOfFameIcon /> : null}
    {player.activeBadge ? <PlayerBadge activeBadge={player.activeBadge}/> : null}
  </span>
);

PlayerLink.propTypes = {
  player: PropTypes.object,
  hideFlag: PropTypes.bool,
  countryOverrides: PropTypes.array
};

export default PlayerLink;
