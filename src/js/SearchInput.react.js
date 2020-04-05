'use strict';

import React from 'react';
import {findDOMNode} from 'react-dom';
import history from "./browserhistory";
import Players from './Players.js';
import Tournaments from './Tournaments.js';

export default class SearchInput extends React.Component {
  render() {
    return (
      <input
        type="text"
        className="searchInput form-control"
        placeholder="Search"
        autoComplete="off"
        ref="input"
      />
    );
  }

  componentDidMount() {
    $(findDOMNode(this)).typeahead({
      source: Tournaments.asArray().concat(Players.asArray()),
      afterSelect: item => {
        if (item.tournaments) {
          history.push('/player/' + item.id);
        } else {
          history.push('/tournament/' + item.id);
        }
        this.refs.input.value = '';
      }
    });
  }
}
