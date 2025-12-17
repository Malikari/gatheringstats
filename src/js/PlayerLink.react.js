'use strict';

import React from 'react';
import {Link} from 'react-router-dom';
import Flag from './Flag.react.js';
import HallOfFameIcon from './HallOfFameIcon.react.js';
import PlayerBadge from './PlayerBadge.react';
import PropTypes from 'prop-types';

const PlayerLink = ({player, hideFlag, countryOverrides, linkUrl, noDefLink}) => {
  const playerNameText = player.natnameNonLat ? player.natnameNonLat : (player.natname ? player.natname : player.name);
  return (
    <span>
      {player.flag && !hideFlag ? (
        <Flag flag={countryOverrides ? countryOverrides.flag : player.flag}
              nationality={countryOverrides ? countryOverrides.nationality : player.nationality}
        />
      ) : null}
      {linkUrl ? <a href={linkUrl} target="_blank" rel="noreferrer">{playerNameText}</a> : !noDefLink ? <Link to={`/player/${player.id}`}>{playerNameText}</Link> : <span>{playerNameText}</span>}
      {player.natnameNonLat ? <text>&nbsp;(</text> : null}
      {player.natnameNonLat ? player.name : null}
      {player.natnameNonLat ? <text>)</text> : null}
      {player.hof && <HallOfFameIcon />}
      {player.activeBadge && <PlayerBadge activeBadge={player.activeBadge}/>}
    </span>
  )
};

PlayerLink.propTypes = {
  player: PropTypes.object,
  hideFlag: PropTypes.bool,
  countryOverrides: PropTypes.array,
  linkUrl: PropTypes.string,
  noDefLink: PropTypes.bool
};

export default PlayerLink;
