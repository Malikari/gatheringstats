'use strict';

import React from 'react';

const PlayerBadge = ({activeBadge}) => {
  let title, classVal = "";
  if (activeBadge === 'mpl') {
    title = 'MPL';
    classVal = 'fa fa-crown';
  } else {
    title = 'RVL';
    classVal = 'fa fa-medal';
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

export default PlayerBadge;
