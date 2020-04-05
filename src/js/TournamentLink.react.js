'use strict';

import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

const TournamentLink = ({tournament}) => (
  <span>
    <Link to={'/tournament/' + tournament.id}>{tournament.name}</Link>
  </span>
);

TournamentLink.propTypes = {
  tournament: PropTypes.object
};

export default TournamentLink;
