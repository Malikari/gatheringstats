'use strict';

import Tournament from './Tournament.js';

// Injected global data
const Tournaments = window.Tournaments;

const TournamentsArray = [];
for (let key in Tournaments) {
  const t = Tournaments[key];
  TournamentsArray.push({
    id: t.id,
    name: t.name + ' (' + t.date.substr(-4) + ')'
  });
}

const byID = id => {
  if (Tournaments[id]) {
    return new Tournament(Tournaments[id]);
  }
  return null;
};

const page = tournament => {
  if (!Tournaments[tournament.id]) {
    return null;
  }
  let filteredTournaments = window.Recent.filter(t => t.type === tournament.type);
  let tournamentIndex = filteredTournaments.findIndex(t => t.id === tournament.id);
  let prev = (tournamentIndex < filteredTournaments.length - 1) ? new Tournament(Tournaments[filteredTournaments[tournamentIndex + 1].id]) : null;
  let next = (tournamentIndex > 0) ? new Tournament(Tournaments[filteredTournaments[tournamentIndex - 1].id]) : null;
  return [prev, next];
};

const asArray = () => TournamentsArray;
export default {asArray, byID, page};
