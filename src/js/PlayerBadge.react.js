'use strict';

import React from 'react';
import PropTypes from 'prop-types';

const PlayerBadge = ({activeBadge}) => {
  let title, classVal = "";
  if (activeBadge === 'mpl') {
    title = 'MPL';
    classVal = 'fas fa-trophy';
  } else {
    title = 'RVL';
    classVal = 'fas fa-medal';
  }

  if (activeBadge.includes("former")) {
    title = "Former" + title;
    classVal = classVal + " former";
  } else {
    title = title + " 2020"
  }
    return (<span title={title}>
    <i className={classVal}/>
  </span>
    );
};

PlayerBadge.propTypes = {
  activeBadge: PropTypes.string
};

export default PlayerBadge;
