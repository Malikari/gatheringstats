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


      <h3>Ranks</h3>
      <p>
        There are various values for rank, that are not just a number.
        <ul>
          <li>P(layed)/A(ttended) are the same thing, we used either at different points. The player played in the tournament, but we don&#39;t know how they did.</li>
          <li>DQ = player was disqualified.</li>
          <li>Tx = player finished amongst the Top x.</li>
          <li>NT = player qualified for the National Team (sometimes via rescind)</li>
          <li>NTA = player was the National Team Alternate</li>
          <li>RNT = Rescinded their spot on the National Team</li>
          <li>QF/SF = Quartefinal/Semifinal</li>
          <li>In some cases we were also a bit more verbose. The text should be self-explanatory.</li>
        </ul>
      </p>
      <h3>Metagame diversity</h3>
      <p>
        For many Pro Tours there is a number for a <i><strong>metagame diversity</strong></i>. What is this about? Tldr answer: Higher number means more decks. Frank Karsten came up with this in <a href = "https://www.magic.gg/news/metagame-mentor-top-modern-decks-from-last-ten-pro-tours">his review</a> on the first ten Modern Pro Tours and you can read up on the definion there. The number can range from 1 (everyone plays the same deck) to n = number of players in the event (everyone is playing a different deck).
      </p>
      <p>
        Of course such a statistic comes with caveats. For some events we just don&#39;t have a detailed metagame breakdown and can&#39;t give a number. Also breaking down a metagame doesn&#39;t follow hard and fast rules either, so different people doing different metagame breakdowns might arrive at different numbers. If you analyze how these numbers are calculated you will realize that it doesn&#39;t make too much of difference if a 5% deck is split in two distinct archetypes or bunched together, but if there is a clear top dog, that comes in different flavors, then it makes a big difference if you lump them together or treat them as distinct archetypes.
      </p>
      <p>
        We give such numbers only for Worlds and Pro Tours.
      </p>

      <h3>Tournaments</h3>
      <p>
        It almost all cases it should be self-explanatory what a tournament is about. There a few things that you might want to know, though.
      </p>
      <p>
        When we display numbers referring to <strong>Pro Tours</strong> then these do not only include Pro Tours themselves but also the World Championships from 1996 to 2011 and Mythic Championships I, II, IV and VI. Worlds in that time were the final event of each Pro Tour season and although not a Pro Tour in name, they were considered to be one in almost every sense of the word. The aforementioned Mythic Championships were structurally very similar to the Pro Tours themselves, so we consider them to be their short-lived successors in spirit. The other three Mythic Championships were Arena-events with smaller numbers of participants, so we disregard them here despite the shared name.
      </p>
      <p>
        There were also a few events in 1996 and 1997 that were named Pro Tours, but would more fittingly be described as large-scale side events. For example Pro Tour Dallas also included a Classic Competition, but this one didn&#39;t award Pro Points and neither did it qualify for subsequent events, so we disregard these events. Junior Divisions of the early Pro Tours are also not counted for these kinds of statistics.
      </p>
      <p>
        Similarly we lump <strong>Grand Prix</strong> and <strong>Spotlight Series</strong> events together for the sake of these statistics. Spotlight Series events are obvious successors to the Grand Prix. However, there are no other sources of confusion, if it says Grand Prix or Spotlight Series then it&#39;s in and otherwise it&#39;s not.
      </p>
      <p>
        We are aware, that not all of the links to event pages are working. In most cases Wizards has taken down the original coverages and it is a lot of tedious work to replace all of the links with their webarchive-versions. However, the <a href="https://web.archive.org/">webarchives</a> are the place where you can find the original coverage. Just copy our url of the event you are looking for and paste it in the <a href="https://web.archive.org/">webarchives</a>.
      </p>

      <h3>Decks</h3>
      <p>
        We have deck lists of all Top 8s of Worlds and Pro Tours as far as these are known. For other events we strive to give the winner&#39;s list when we conveniently come across such a deck list, but this is very much work in progress.
      </p>

      <h3>Names</h3>
      <p>
        You might have noticed that names are displaced in different ways throughout the site. Why the inconsistency? There are three main reasons for this. Part of it is just plainly our ignorance of how a name should be displaced (mostly non-Western names). Some part of it comes back to ease of use: We like to display a name in the native way to write it, while realizing that many names are really hard to type into the search box if you don&#39;t use the native keyboard layout, so we decided to use ASCII-spelling for the search box, but display the name correctly only player page. Finally there are names that use a different character set in their native spelling. Where we know the native version as well as the transcription, we display the native version and put the transcription in brackets. For the convenience of most (let&#39;s not kid ourselves here) users, you still search for them by their transcription.
      </p>
      <p>
        When it comes to the ordering of names, we mostly try to adhere to what is usally considered the standard practice. For example Japanese names are usually written in given name family name order despite that not being the Japanese way. On the other hand Chinese names are usually also written family name given name and this is also the way Westerners write Chinese names, which we try to adhere to. Unfortunately in many cases we just don&#39;t know which is which. Hungarians also write their names this way. Mostly for the simple reason that they play tournaments almost exclusively in Europe and their names are then displayed given name family name, we ended up having these versions in our database and sticked to them. In some cases like Hong Kong it gets even more complicated. Frankly we try to be consistent within a language, but our knowledge is too limited in many cases.
      </p>
      

      <h3>Sources</h3>

      <p>
        The sources section is mostly useful for the absolute Pro Tour history nerds that contribute themselves. This section includes a lot of stuff you would probably find in such a person&#39;s bookmarks. Most of the lists are very much not complete, sometimes because we haven&#39;t found adequate sources and sometimes because we haven&#39;t come around to putting all the stuff there. Feel free to check it out, but for most of you it&#39;s probably not very enlightening.
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
      
      <p>
        Last but not least we would like to thank everyone who patiently answered our questions about tournaments long past. This includes
      </p>
      <p>
        ajlvi, Einar Ágúst Baldvinsson, beatsandskies, Björn Bergenfeldt, Orr Bildner, Sveinung Bjørnerud, Nico Bohny, Márcio Carvalho, Başar Coşkunoğlu, Mark Dictus, Willy Edel, Christian Gawrilowicz, Thomas Holzinger, Jeppe Skafte Johansen, Martin Jůza, Frank Karsten, Gábor Kocsis, Peer Kröger, Kuo Tzu-Ching, Sylvain Lauriol, Raphaël Lévy, Humberto Patarca, Uri Peleg Droy, Oliver Polak-Rottmann, Sebastián Pozzo, Olle Råde, Ben Seck, Aras Senyuz, Chapman Sim, Stjepan Sučić, Stephan Valkyser, Yusuf Kemal Vefa, Matej Zatlkaj.
      </p>
      <p>
        Special thanks to Andrey Goder for creating the original template of Gatheringstats, then mtgptresults!
      </p>
    </div>
  );
}