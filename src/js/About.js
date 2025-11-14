'use strict';

import React from "react";

export default function AboutPage() {
  return (
    <div className="col-md-offset-3 col-md-6">
      <h1>About Gatheringstats</h1>
      <p>
        The goal of Gatheringstats is to provide as full a picture as possible of high-level competitive Magic: The Gathering play.
      </p>
      <p>
        World Championships and Pro Tours are therefore obvious inclusions, but what else? Any event that awards Pro Points or modern equivalents is an obvious inclusion as it contributes towards players invitations to further professional events. We could have drawn the boundary just there, but there are so many other events, that are worth preserving that we tried to encompass a bit more. We did not include any independent series however.
      </p>
      <p>
        Generally we tried to include
        <ul>
          <li>events that awarded Pro Points or modern equivalents like AMP</li>
          <li>events that award cash prizes</li>
          <li>Nationals and Continentals</li>
          <li>Top-level Arena and MTGO-events</li>
          <li>Eternal Championships</li>
          <li>a wild menagerie of other historic events of note like JSS finals, Amateur Championships or the Ice Age Prerelease</li>
        </ul>
      </p>
      <p>
        For the pinnacle of competitive MTG we try to be extra diligent in curating the results and provide more contextual information. On the other end, for many events it is unrealistic or even impossible to obtain complete final standings as these have not been preserved. Thus for Nationals our goal is to get at least the Top 8s, for GPs everything that awarded money and/or Pro Points. The additional advantage of this approach is, that it doesn&#39;t lead to an uncuratable amount of data. Over the years hundreds of thousands of players have attended GPs and guessing which duplicate name belongs to which person is a lot of work, that doesn&#39;t really lead anywhere.
      </p>
      <h2>Why Gatheringstats?</h2>
      <p>
        If you want to look up historic Magic results there are (at least) three very good websites, that all have different strengths and weaknesses. <a href="https://mtgeloproject.net/">mtgeloproject</a> is your place to go if you want to see a match-by-match history of a player and inferred from that the strength of that player at a certain point. The <a href="https://mtg.wiki/">MTGWiki</a> is the best place if you are interested in contextual information, as it provides a lot written text instead of pure data. They are also very diligent about sourcing their information.
      </p>
      <p>
        So where does Gatheringstats fit in? As the original name of the site, mtgptresults, suggests, we are pretty good at showing you results: Results of tournaments aka final standings and the relevant results of individual players with everything these results entailed (money, Pro Points, AMP, ...). As far as we know it is also the only place where you can get a really good overview over the most successful players from each nation.
      </p>
      <h2>How to use</h2>
      <p>
        For the most part the site is self-explanatory of course. There are a few things worth an additional, short explanation, though.
      </p>
      <p>
        There are some default assumptions for the tournament structure, which is relevant for <strong>additional information</strong> sections. Just as you would expect, we don&#39;t mention it when matches are Bo3, tournament rounds are paired Swiss-style, and drafts are paired in-pod. This is just the way things are done normally. We mention when a tournament deviated from the default.
      </p>
      <p>
        There are various values for rank, that are not just a number.
        <ul>
          <li>P(layed)/A(ttended) are the same thing, we used either at different points. The player played in the tournament, but we don&#39;t know how they did.</li>
          <li>DQ = player was disqualified.</li>
          <li>Tx = player finished amongst the Top x.</li>
          <li>NT = player qualified for the National Team (sometimes via rescind)</li>
          <li>NTA = player was the National Team Alternate</li>
          <li>In some cases we were also a bit more verbose. The text should be self-explanatory.</li>
        </ul>
      </p>
      <p>
        PS: We are aware, that not all of the links to event pages are working. In most cases Wizards has taken down the original coverages and it is a lot of tedious work to replace all of the links with their webarchive-versions. However, the <a href="https://web.archive.org/">webarchives</a> are the place where you can find the original coverage. Just copy our url of the event you are looking for and paste it in the <a href="https://web.archive.org/">webarchives</a>.
      </p>
      <h2>Contribute</h2>
      <p>
        If you have anything that improves our database, contact us! We try our best to curate the data, but there will always be mistakes and inconsistencies. The easiest way to get in touch would be to message odinf.bsky.social via Bluesky. What do we need?
        <ul>
          <li>information on tournaments we are obviously missing</li>
          <li>more information on tournaments, where our information is incomplete (particularly Nationals)</li>
          <li>hints on consolidating our player database (in some cases players with different names might be the same person or vice versa)</li>
          <li>if you are tech-savvy and think we should have a feature, you can go to our <a href="https://github.com/Malikari/gatheringstats">project page</a> on Github, pull the code, and implement them yourself</li>
          <li>if you want your nationality included (to show up in your natinonal rankings), let us know</li>
        </ul>
      </p>
      
    </div>
  );
}