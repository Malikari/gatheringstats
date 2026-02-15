'use strict';

import Helper from './../../lib/helper.js';

export default class Tournament {
  constructor(data) {
    this.teamsize = data.teamsize || 1;
    this.date = data.date;
    this.season = data.season;
    this.name = data.name;
    this.id = data.id;
    this.coverage = data.coverage;
    this.formats = data.formats;
    this.structure = data.structure;
    this.medium = data.medium;        //Arena / MTGO / Tabletop
    this.location = data.location;    //city, (state), country
    this.site = data.site;           //actual tournament site (only used for PTs and Worlds)
    this.standings = data.standings;
    this.metadiversity = data.metadiversity;
    this.type = data.type || '';
    this.topfinish = Boolean(data.topfinish);    //is the tournament used to calculate top finishes (only used for non-PTs)
    this.topfinishcut = data.topfinishcut;      //the number of players used to calculate top finishes (only used when deviating from topn)
    this.topn = data.topn;                    //the actual cut before single elimination
  }

  getResultClassName(finish) {
    if (finish === 1) {
      return 'success';
    }
    if (this.topn) {
      if (finish <= this.topn) {
        return 'warning';
      }
      return null;
    }
    // default is teamsize based
    if (this.teamsize > 1 && finish <= 4) {
      return 'warning';
    }
    if (this.teamsize == 1 && finish <= 8) {
      return 'warning';
    }
    return null;
  }

  getPlayerIndex(index) {
    return Helper.getPlayerIndex(index, this.teamsize);
  }

  getPlayerClassName(index) {
    return this.getResultClassName(this.getPlayerIndex(index) + 1);
  }

  getNationalityInfo(index) {
    if (this.standings[index].nationality) {
      return {flag: this.standings[index].flag, nationality: this.standings[index].nationality};
    }
    return null;
  }
}
