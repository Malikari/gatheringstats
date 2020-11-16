'use strict';

import accounting from 'accounting';

export const formatMoney = amount =>
  amount && accounting.formatMoney(amount, '$', 0);

export const filterOnlyProTours = item => (item.type === 'Pro Tour' || item.type === 'Player Tour Finals Online');

export const filterOnlyProLeagues = item => (item.type === 'Magic Pro League' || item.type === 'Rivals League');

export const filterOnlyNationals = item => /Nationals/.test(item.type);

export const filterOnlyGrandPrix = item => item.type === 'Grand Prix';

export const filterOnlyOtherTournaments = item => (item.type !== 'Pro Tour' && item.type !== 'Grand Prix' && item.type !== 'Player Tour Finals Online' && !/Nationals/.test(item.type) && item.medium !== 'Arena');

export const filterOnlyArena = item => item.medium === 'Arena';
