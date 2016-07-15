'use strict';

const React = require('react');

const Flag = ({flag}) => (
  <span className={'flag-icon flag-icon-' + flag}></span>
);

module.exports = Flag;
