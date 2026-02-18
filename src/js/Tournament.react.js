'use strict';

import React from 'react';
import NotFound from './NotFound.react.js';
import PlayerLink from './PlayerLink.react.js';
import Tournaments from './Tournaments.js';
import {formatMoney} from './utils.js';
import Players from './Players.js';
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

import PropTypes from 'prop-types';

import { CollapsibleBox, CollapsibleIframeBox } from "./CollapsibleBox";

function ReportsLinked ({ report }) {

  const reports = typeof report === 'string' ? [report] : report;

  if (!reports || reports.length === 0) return null;
  else if (reports.length === 1) {
    return (<><span className="reports">(</span><a href = {reports[0]}>Report</a><span>)</span></>);
  }
  else {
    return (
      <>
        <span className="reports">
        (
        {reports.map((rep, i) => (
          <React.Fragment key={i}>
            {i > 0 ? ", " : "Report Part "}
            <a href={rep}>{i + 1}</a>
          </React.Fragment>
        ))}
        )
        </span>
      </>
    );
  }
}

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
        {t.metadiversity ? <p className="lead tournamentLead">Metagame diversity: {t.metadiversity}</p> : null}
        
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
            {t.type === 'World Championships' || t.type === 'Pro Tour' && t.season > '2022' ? <th>POY</th> : null}
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
                  <ReportsLinked report = {p.report} />
                  {p.dq ? (<span>(<a href = {p.dq}>DQ Report</a>)</span>) : null}
                  {p.deck ? <CollapsibleIframeBox src={`https://moxfield.com/embed/${p.deck}?hideTotal=true`} labelDef="deck" labelOpen="hide deck" height="500"/> : null}
                </td>
                {(t.type === 'Pro Tour' && t.name < 'Mz' && t.name > 'a') || t.type === 'Magic Pro League' || t.type === 'Mythic Championship' || t.type === 'Arena Mythic Championship Qualifier' ? <td>{p.mythicpoints}</td> : null}
                {(t.type === 'Pro Tour' && t.season < '2022' && (t.name > 'N' || t.name < 'Mythic Championship III')) || t.type === 'Grand Prix' || t.type === 'WMC' || (t.type === 'World Championships' && t.name > '1996') || /Nationals/.test(t.type) ? <td>{p.propoints}</td> : null}
                {t.type === 'Players Tour' || t.type === 'Players Tour Finals' ? <td>{p.playerspoints}</td> : null}
                {t.type === 'Pro Tour' && t.season > '2022' ? <td>{p.amp}</td> : null}
                {t.type === 'World Championships' || t.type === 'Pro Tour' && t.season > '2022' ? <td>{p.poy}</td> : null}
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

ReportsLinked.propTypes = {
  report: PropTypes.string
};

export default Tournament;

