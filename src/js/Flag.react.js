'use strict';

import React from 'react';
import PropTypes from "prop-types";

const Flag = ({flag, nationality}) => (
  <span className={'flag-icon flag-icon-' + flag} title={nationality} />
);

Flag.propTypes = {
  flag: PropTypes.string,
  nationality: PropTypes.string
};

export default Flag;
