'use strict';

import accounting from 'accounting';

export const formatMoney = amount =>
  amount && accounting.formatMoney(amount, '$', 0);

export const filterOnlyProTours = item => (item.type === 'Pro Tour' || item.type === 'Player Tour Finals Online');

export const filterOnlyProLeagues = item => (item.type === 'Magic Pro League' || item.type === 'Rivals League');

export const filterOnlyGrandPrix = item => item.type === 'Grand Prix';

export const filterOtherTournaments = item => (item.type !== 'Pro Tour' && item.type !== 'Grand Prix' && item.type !== 'Magic Pro League' && item.type !== 'Rivals League');
