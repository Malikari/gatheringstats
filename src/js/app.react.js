'use strict';

import React from 'react';
import {render} from 'react-dom';
import {
  Router,
  Route,
  IndexRoute,
  browserHistory,
  applyRouterMiddleware
} from 'react-router';
import {useScroll} from 'react-router-scroll';

import NotFound from './NotFound.react.js';
import Page from './Page.react.js';
import Player from './Player.react.js';
import Tournament from './Tournament.react.js';
import Rankings from './Rankings.react.js';
import RecentTournaments from './RecentTournaments.react.js';
import { ProLeagues } from './RecentTournaments.react.js';
import { GrandPrix } from './RecentTournaments.react.js';
import { OtherTournaments } from './RecentTournaments.react.js';
import HallOfFame from "./HallOfFame.react";

render(
  <Router history={browserHistory} render={applyRouterMiddleware(useScroll())}>
    <Route path="/" component={Page}>
      <IndexRoute component={RecentTournaments} />
      <Route path="/player/:id" component={Player} />
      <Route path="/tournament/:id" component={Tournament} />
      <Route path="/rankings/:col" component={Rankings} />
      <Route path="/pro-leagues" component={ProLeagues} />
      <Route path="/grand-prix" component={GrandPrix} />
      <Route path="/other-tournaments" component={OtherTournaments} />
      <Route path="/hall-of-fame/:col" component={HallOfFame} />
      <Route path="*" component={NotFound} />
    </Route>
  </Router>,
  document.getElementById('approot')
);
