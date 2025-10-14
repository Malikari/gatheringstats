'use strict';

import React from 'react';
import NotFound from './NotFound.react.js';
import PlayerLink from './PlayerLink.react.js';
import Tournaments from './Tournaments.js';
import {formatMoney} from './utils.js';
import Players from './Players.js';
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

import CollapsibleBox from "./CollapsibleBox";

const Tournament = () => {
  let id = useParams().id;
  const t = Tournaments.byID(id);
  const surrounding = Tournaments.page(t);
  const prev = surrounding[0];
  const next = surrounding[1];
  if (!t) {
    return <NotFound />;
  }
  return (
    <div className="col-md-offset-3 col-md-6">
      <Helmet>
        <title>{t.name}</title>
      </Helmet>
      <nav aria-label="...">
        <ul className="pager">
          {prev ? <li className="previous"><a href={"/tournament/" + prev.id}><span aria-hidden="true">&larr;</span> {prev.name}</a></li> : ''}
          {next ? <li className="next"><a href={"/tournament/" + next.id}>{next.name} <span aria-hidden="true">&rarr;</span></a></li> : ''}
        </ul>
      </nav>
      <div className="page-header pageHeader">
        <h1>{t.coverage ? <a href={t.coverage}>{t.name}</a> : t.name}</h1>
        <p className="lead tournamentLead">{t.formats.join(', ')} ({t.medium})</p>
        <p className="lead tournamentLead">{t.date}</p>
        <p className="lead tournamentLead">{t.location}</p>
        {t.site ? <p className="lead tournamentLead">{t.site}</p> : null}
        <CollapsibleBox data={t.structure} label="additional information"/>
        
      </div>
      <table className="table standingsTable table-hover">
        <thead>
          <tr>
            <th />
            <th>Player</th>
            {(t.type === 'Pro Tour' && t.name < 'Mz' && t.name > 'a') || t.type === 'Magic Pro League' || t.type === 'Mythic Championship' || t.type === 'Arena Mythic Championship Qualifier' ? <th>Mythic Points</th> : null}
            {(t.type === 'Pro Tour' && t.season < '2022' && (t.name > 'N' || t.name < 'Mythic Championship III')) || t.type === 'Grand Prix' || t.type === 'WMC' || (t.type === 'World Championships' && t.name > '1996') || /Nationals/.test(t.type) ? <th>Pro Points</th> : null}
            {t.type === 'Players Tour' || t.type === 'Players Tour Finals' ? <th>Players Points</th> : null}
            {t.type === 'Pro Tour' && t.season > '2022' ? <th>AMP</th> : null}
            <th>Prize Money</th>
            <th>Match Points</th>
          </tr>
        </thead>
        <tbody>
          {t.standings.map((p, index) => {
            return (
              <tr className={t.getPlayerClassName(index)} key={p.id}>
                <td>{p.rank || t.getPlayerIndex(index) + 1}</td>
                <td>
                  <PlayerLink player={Players.byID(p.id)} countryOverrides={t.getNationalityInfo(index)}/>{' '}
                  {p.deck || p.report ? "(" : null}
                  {p.deck ? <a href={p.deck}>deck</a> : null}
                  {p.deck && p.report ? ", " : null}
                  {p.report ? <a href={p.report}>report</a> : null}
                  {p.deck || p.report ? ")" : null}
                </td>
                {(t.type === 'Pro Tour' && t.name < 'Mz' && t.name > 'a') || t.type === 'Magic Pro League' || t.type === 'Mythic Championship' || t.type === 'Arena Mythic Championship Qualifier' ? <td>{p.mythicpoints}</td> : null}
                {(t.type === 'Pro Tour' && t.season < '2022' && (t.name > 'N' || t.name < 'Mythic Championship III')) || t.type === 'Grand Prix' || t.type === 'WMC' || (t.type === 'World Championships' && t.name > '1996') || /Nationals/.test(t.type) ? <td>{p.propoints}</td> : null}
                {t.type === 'Players Tour' || t.type === 'Players Tour Finals' ? <td>{p.playerspoints}</td> : null}
                {t.type === 'Pro Tour' && t.season > '2022' ? <td>{p.amp}</td> : null}
                <td>{formatMoney(p.money)}</td>
                <td>{p.matchpoints}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Tournament;
