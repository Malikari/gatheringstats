'use strict';

import React from 'react';
import {Link} from 'react-router-dom';
import SearchInput from './SearchInput.react.js';
import PropTypes from "prop-types";

const Page = props => (
  <div>
    <div className="navbar navbar-default">
      <div className="container-fluid">
        <div className="navbar-header">
          <Link className="navbar-brand" to="/">
            Gathering Stats
          </Link>
        </div>
        <ul className="nav navbar-nav">
          <li>
            <Link to="/worlds">
              Worlds
            </Link>
          </li>
          <li>
            <Link to="/grand-prix">
              GPs / Spotlights
            </Link>
          </li>
          <li>
            <Link to="/nationals">
              Nationals / Continentals
            </Link>
          </li>
          <li>
            <Link to="/arena">
              Arena
            </Link>
          </li>
          <li>
            <Link to="/magic-online">
              MTGO 
            </Link>
          </li>
          <li>
            <Link to="/other-tournaments">
              Other Tournaments
            </Link>
          </li>
          <li>
            <Link to="/rankings/t8">
              Player Rankings
            </Link>
          </li>
          <li>
            <Link to="/hall-of-fame/year">
              Hall of Fame
            </Link>
          </li>
        </ul>
        <div className="navbar-form navbar-right">
          <SearchInput />
        </div>
      </div>
    </div>
    {props.children}
  </div>
);

Page.propTypes = {
  children: PropTypes.any
};

export default Page;
