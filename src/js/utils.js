'use strict';

import accounting from 'accounting';

export const formatMoney = amount =>
  amount && accounting.formatMoney(amount, '$', 0);

export const filterOnlyProTours = item => (item.type === 'Pro Tour');

export const filterOnlyWorlds = item => (item.type === 'World Championships' || item.type === 'WMC' || (item.type === 'Pro Tour' && item.name.includes("World Championship")));

export const filterOnlyProLeagues = item => (item.type === 'Magic Pro League' || item.type === 'Rivals League');

export const filterOnlyNationals = item => (/Nationals/.test(item.type) || item.type === 'Asia Pacific Championship' || item.type === 'European Championship' || item.type === 'Latin America Championship');

export const filterOnlyGrandPrix = item => (item.type === 'Grand Prix' || item.type === 'Magic Spotlight');

export const filterOnlyOtherTournaments = item => (item.type !== 'Pro Tour' && item.type !== 'World Championships' && item.type !== 'WMC' && item.type !== 'Magic Spotlight' && item.type !== 'Grand Prix' && !/Nationals/.test(item.type) && item.medium !== 'Arena' && item.medium !== 'Magic Online' && item.type !== 'Asia Pacific Championship' && item.type !== 'European Championship' && item.type !== 'Latin America Championship');

export const filterOnlyArena = item => item.medium === 'Arena';

export const filterOnlyMagicOnline = item => item.medium === 'Magic Online';
