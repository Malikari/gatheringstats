'use strict';

import React from 'react';
import {Link} from 'react-router';

import Flag from './Flag.react.js';
import HallOfFameIcon from './HallOfFameIcon.react.js';
import MPLIcon from './MPLIcon.react';

const PlayerLink = ({player, hideFlag, countryOverrides}) => (
  <span>
    {player.flag && !hideFlag ? (
      <Flag flag={countryOverrides ? countryOverrides.flag : player.flag}
            nationality={countryOverrides ? countryOverrides.nationality : player.nationality}
      />
    ) : null}
    <Link to={'/player/' + player.id}>{player.name}</Link>
    {player.hof ? <HallOfFameIcon /> : null}
    {player.mpl ? <MPLIcon /> : null}
  </span>
);
export default PlayerLink;
