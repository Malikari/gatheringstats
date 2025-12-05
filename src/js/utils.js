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

export const nationGroups = {
  "Argentina": ['Argentina'],
  "Australia": ['Australia'],
  "Austria": ['Austria'],
  "Belarus": ['Belarus'],
  "Belgium": ['Belgium'],
  "Bolivia": ['Bolivia (Plurinational State of)'],
  "Brazil": ['Brazil'],
  "Bulgaria": ['Bulgaria'],
  "Canada": ['Canada'],
  "Chile": ['Chile'],
  "China": ['China'],
  "Colombia": ['Colombia'],
  "Costa Rica": ['Costa Rica'],
  "Croatia": ['Croatia'],
  "Cyprus": ['Cyprus'],
  "Czech Republic": ['Czech Republic'],
  "Denmark": ['Denmark'],
  "Dominican Republic": ['Dominican Republic'],
  "Ecuador": ['Ecuador'],
  "El Salvador": ['El Salvador'],
  "England": ['England'],
  "Estonia": ['Estonia'],
  "Finland": ['Finland'],
  "France": ['France'],
  "Germany": ['Germany'],
  "Greece": ['Greece'],
  "Guatemala": ['Guatemala'],
  "Hong Kong": ['Hong Kong'],
  "Hungary": ['Hungary'],
  "Iceland": ['Iceland'],
  "Indonesia": ['Indonesia'],
  "Ireland": ['Ireland'],
  "Israel": ['Israel'],
  "Italy": ['Italy'],
  "Japan": ['Japan'],
  "Kazakhstan": ['Kazakhstan'],
  "Latvia": ['Latvia'],
  "Lithuania": ['Lithuania'],
  "Luxembourg": ['Luxembourg'],
  "Macedonia": ['Macedonia (the former Yugoslav Republic of)'],
  "Malaysia": ['Malaysia'],
  "Mexico": ['Mexico'],
  "Netherlands": ['Netherlands'],
  "New Zealand": ['New Zealand'],
  "Northern Ireland": ['Northern Ireland'],
  "Norway": ['Norway'],
  "Panama": ['Panama'],
  "Peru": ['Peru'],
  "Philippines": ['Philippines'],
  "Poland": ['Poland'],
  "Portugal": ['Portugal'],
  "Puerto Rico": ['Puerto Rico'],
  "Romania": ['Romania'],
  "Russia": ['Russian Federation'],
  "Scotland": ['Scotland'],
  "Serbia": ['Serbia'],
  "Singapore": ['Singapore'],
  "Slovakia": ['Slovakia'],
  "Slovenia": ['Slovenia'],
  "South Africa": ['South Africa'],
  "South Korea": ['Korea (Republic of)'],
  "Spain": ['Spain'],
  "Sweden": ['Sweden'],
  "Switzerland": ['Switzerland'],
  "Taiwan": ['Taiwan, Province of China'],
  "Thailand": ['Thailand'],
  "Turkey": ['Turkey'],
  "Ukraine": ['Ukraine'],
  "UAE": ['United Arab Emirates'],
  "United States": ['United States of America'],
  "Uruguay": ['Uruguay'],
  "Venezuela": ['Venezuela (Bolivarian Republic of)'],
  "Wales": ['Wales'],
  
  "Americas": ['Argentina', 'Bolivia (Plurinational State of)', 'Brazil', 'Canada', 'Chile', 'Colombia', 'Costa Rica', 'Dominican Republic', 'Ecuador', 'El Salvador', 'Guatemala', 'Mexico', 'Panama', 'Peru', 'Puerto Rico', 'United States of America', 'Uruguay', 'Venezuela (Bolivarian Republic of)'],
  "Asia": ['China', 'Hong Kong', 'Indonesia', 'Kazakhstan', 'Malaysia', 'Philippines', 'Singapore', 'Korea (Republic of)', 'Taiwan, Province of China', 'Thailand', 'United Arab Emirates'],
  "North America": ['Canada', 'United States of America'],
  "Central America": ['Costa Rica', 'El Salvador', 'Guatemala', 'Panama'],
  "South America": ['Argentina', 'Bolivia (Plurinational State of)', 'Brazil', 'Chile', 'Colombia', 'Ecuador', 'Peru', 'Uruguay', 'Venezuela (Bolivarian Republic of)'],
  "Europe": ['Austria', 'Belarus', 'Belgium', 'Bulgaria', 'Croatia', 'Cyprus', 'Czech Republic', 'Denmark', 'England', 'Estonia', 'Finland', 'France', 'Germany', 'Greece', 'Hungary', 'Iceland', 'Ireland', 'Italy', 'Latvia', 'Lithuania', 'Luxembourg', 'Macedonia (the former Yugoslav Republic of)', 'Netherlands', 'Northern Ireland', 'Norway', 'Poland', 'Portugal', 'Romania', 'Russian Federation', 'Scotland', 'Serbia', 'Slovakia', 'Slovenia', 'Spain', 'Sweden', 'Switzerland', 'Turkey', 'Ukraine', 'Wales'],

  "EU": ['Austria', 'Belgium', 'Bulgaria', 'Croatia', 'Cyprus', 'Czech Republic', 'Denmark', 'Estonia', 'Finland', 'France', 'Germany', 'Greece', 'Hungary', 'Ireland', 'Italy', 'Latvia', 'Lithuania', 'Luxembourg', 'Netherlands', 'Poland', 'Portugal', 'Romania', 'Slovakia', 'Slovenia', 'Spain', 'Sweden'],
  "Latin America": ['Argentina', 'Bolivia (Plurinational State of)', 'Brazil', 'Chile', 'Colombia', 'Costa Rica', 'Dominican Republic', 'Ecuador', 'El Salvador', 'Guatemala', 'Mexico', 'Panama', 'Peru', 'Puerto Rico', 'Uruguay', 'Venezuela (Bolivarian Republic of)'],
  
  "Balticum": ['Estonia', 'Latvia', 'Lithuania'],
  "Benelux": ['Belgium', 'Luxembourg', 'Netherlands'],
  "DACh": ['Austria', 'Germany', 'Switzerland'],
  "Scandinavia": ['Denmark', 'Finland', 'Iceland', 'Norway', 'Sweden'],
  "United Kingdom": ['England', 'Northern Ireland', 'Scotland', 'Wales']
};

export const seasons = [
  "",
  "1996",
  "1996-97",
  "1997-98",
  "1998-99",
  "1999-2000",
  "2000-01",
  "2001-02",
  "2002-03",
  "2003-04",
  "2005",
  "2006",
  "2007",
  "2008",
  "2009",
  "2010",
  "2011",
  "2012",
  "2012-13",
  "2013-14",
  "2014-15",
  "2015-16",
  "2016-17",
  "2017-18",
  "2018-19",
  "2020",
  "2020-21",
  "2021-22",
  "2022-23",
  "2023-24",
  "2024-25"
];