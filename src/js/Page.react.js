'use strict';

import React from 'react';
import {Link} from 'react-router-dom';
import SearchInput from './SearchInput.react.js';
import PropTypes from "prop-types";

function Dropdown({ children }) {
  const [open, setOpen] = React.useState(false);

  return (
    <li
      className={`dropdown ${open ? 'open' : ''}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {children}
    </li>
  );
}

const Page = props => {
  return (
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
            <Dropdown>
              <a href="#">
                Other <span className="caret" />
              </a>
              <ul className="dropdown-menu">
                <li><Link to="/grand-prix">GPs / Spotlights</Link></li>
                <li><Link to="/regionals">Regional Championships</Link></li>
                <li><Link to="/nationals">Nationals / Continentals</Link></li>
                <li><Link to="/eternal">Eternal Championships</Link></li>
                <li><Link to="/masters">Masters Series</Link></li>
                <li><Link to="/invitational">Invitational</Link></li>
                <li><Link to="/juniors">Junior tournaments</Link></li>
                <li><Link to="/arena">Arena</Link></li>
                <li><Link to="/magic-online">MTGO</Link></li>
                <li><Link to="/other-tournaments">Uncategorized</Link></li>
              </ul>
            </Dropdown>
            <li>
              <Link to="/rankings/topfinish">
                Player Rankings
              </Link>
            </li>
            <li>
              <Link to="/hall-of-fame/year">
                Hall of Fame
              </Link>
            </li>
            <Dropdown>
              <a href="#">
                Sources <span className="caret" />
              </a>
              <ul className="dropdown-menu">
                <li><Link to="/peip">Premier Event Invitation Policy</Link></li>
                <li><Link to="/facts">Event Fact Sheets</Link></li>
                <li><Link to="/lifetimepropoints">Lifetime Pro Points</Link></li>
                <li><Link to="/propointsbyseason">Pro Points by Season</Link></li>
              </ul>
            </Dropdown>
            <li>
              <Link to="/about">
                About
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
};

Page.propTypes = {
  children: PropTypes.any
};

Dropdown.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Page;
