'use strict';

import {formatMoney} from './utils.js';

export default class Player {
  constructor(data) {
    this.flag = data.flag;
    this.id = data.id;
    this.name = data.name;
    this.nationality = data.nationality;
    this.hof = data.hof;
    this.mpl = data.mpl;
    this.stats = data.stats;
    this.tournaments = data.tournaments;

    if (this.hof) {
      this.stats.year = this.hof.year;
      this.stats.rank = this.hof.rank;
    }
  }

  getMoney() {
    return formatMoney(this.stats.money);
  }
}
