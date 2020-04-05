'use strict';

import React from 'react';
import history from "./browserhistory";
import Players from './Players.js';
import Tournaments from './Tournaments.js';

export default class SearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }
  render() {
    return (
      <input
        type="text"
        className="searchInput form-control typeahead"
        data-provide="typeahead"
        placeholder="Search"
        autoComplete="off"
        ref={textInput => this.textInput = textInput}
      />
    );
  }

  componentDidMount() {
    $(this.textInput).typeahead({
      source: Tournaments.asArray().concat(Players.asArray()),
      afterSelect: item => {
        if (item.tournaments) {
          history.push('/player/' + item.id);
        } else {
          history.push('/tournament/' + item.id);
        }
        this.textInput.value = '';
      }
    });
  }
}
