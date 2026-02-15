'use strict';

import React from 'react';
import {render} from 'react-dom';
import {
  Router, Route, Switch
} from "react-router-dom";

import Page from './Page.react.js';
import Player from './Player.react.js';
import Tournament from './Tournament.react.js';
import Rankings from './Rankings.react.js';
import RecentTournaments from './RecentTournaments.react.js';
import { ProLeagues } from './RecentTournaments.react.js';
import { Worlds } from './RecentTournaments.react.js';
import { Nationals } from './RecentTournaments.react.js';
import { GrandPrix } from './RecentTournaments.react.js';
import { OtherTournaments } from './RecentTournaments.react.js';
import { Arena } from './RecentTournaments.react.js';
import { MagicOnline } from './RecentTournaments.react.js';
import { Regionals } from './RecentTournaments.react.js';
import { Eternals } from './RecentTournaments.react.js';
import { Masters } from './RecentTournaments.react.js';
import { Juniors } from './RecentTournaments.react.js';
import { Invitational } from './RecentTournaments.react.js';
import HallOfFame from "./HallOfFame.react";
import NotFound from "./NotFound.react";
import history from "./browserhistory";
import ScrollToTop from "./ScrollToTop";
import AboutPage from "./About.js";
import Peip from "./../../data/documents/Peip.jsx";
import FactSheets from "./../../data/documents/FactSheets.jsx";
import LifeTimeProPoints from "./../../data/documents/LifetimeProPoints.jsx";
import ProPointsBySeason from "./../../data/documents/ProPointsBySeason.jsx";

render(
  <Router history={history}>
    <ScrollToTop />
    <Route path="/" component={Page} />
    <Switch>
      <Route exact path="/" component={RecentTournaments} />
      <Route path="/player/:id" component={Player} />
      <Route path="/tournament/:id" component={Tournament} />
      <Route path="/rankings/:col" component={Rankings} />
      <Route path="/worlds" component={Worlds} />
      <Route path="/masters" component={Masters} />
      <Route path="/nationals" component={Nationals} />
      <Route path="/pro-leagues" component={ProLeagues} />
      <Route path="/grand-prix" component={GrandPrix} />
      <Route path="/other-tournaments" component={OtherTournaments} />
      <Route path="/arena" component={Arena} />
      <Route path="/regionals" component={Regionals} />
      <Route path="/juniors" component={Juniors} />
      <Route path="/eternal" component={Eternals} />
      <Route path="/invitational" component={Invitational} />
      <Route path="/magic-online" component={MagicOnline} />
      <Route path="/peip" component={Peip} />
      <Route path="/facts" component={FactSheets} />
      <Route path="/lifetimepropoints" component={LifeTimeProPoints} />
      <Route path="/propointsbyseason" component={ProPointsBySeason} />
      <Route path="/hall-of-fame/:col" component={HallOfFame} />
      <Route path="/about" component={AboutPage} />
      <Route path="*" component={NotFound} />
    </Switch>
  </Router>,
  document.getElementById('approot')
);
