import ClientScripts from "./client-scripts";

export default function HomePage() {
  return (
    <>
      <nav className="nav">
        <div className="nav-inner">
          <a href="#top" className="brand">
            <span className="dot" />
            <b>akiwaky</b>
            <span className="slash">/</span>cloud
          </a>
          <div className="nav-links">
            <a href="#building">building</a>
            <a href="#channels">music</a>
            <a href="#channels">gallery</a>
            <a href="#channels">labs</a>
            <a href="#work">solutions</a>
            <div className="lang-switch" role="group" aria-label="Language">
              <button type="button" className="lang-btn is-active" data-lang="en" aria-pressed="true" title="English">EN</button>
              <button type="button" className="lang-btn" data-lang="es" aria-pressed="false" title="Español">ES</button>
            </div>
            <a href="#contact" className="nav-cta mobile-keep">say hi →</a>
          </div>
        </div>
      </nav>

      <main id="top">
        {/* HERO */}
        <section className="hero bg-warm">
          <div className="wrap">
            <div className="hero-top">
              <div className="hero-meta">
                <span className="chip"><span className="dot" />online · shipping things</span>
                <span style={{ color: "var(--ink-4)" }}>/ Mexico City — UTC-6</span>
              </div>
              <div className="hero-stamp">akiwaky.cloud · v2 · personal page</div>
            </div>

            <h1 className="name-display" aria-label="Alejandro AG">
              <span className="line1">Alejandro</span>
              <span className="line2">
                AG<span className="period">.</span>
              </span>
            </h1>

            <p className="name-subtitle">
              Builder of useful <em>little machines</em>.
            </p>

            <div className="hero-grid" style={{ margin: "86px 0 0" }}>
              <div className="hero-left">
                <div className="roles">
                  <span>engineer</span><span className="sep">·</span>
                  <span>automator</span><span className="sep">·</span>
                  <span>melómano</span><span className="sep">·</span>
                  <span>photographer</span><span className="sep">·</span>
                  <span>occasional travel advisor</span>
                </div>

                <p className="hero-desc">
                  This is my corner of the internet — part portfolio, part lab, part business card, part{" "}
                  <span className="quiet">&ldquo;I had an idea at 1:37am and shipped it.&rdquo;</span>
                </p>

                <div className="ctas">
                  <a className="btn btn-primary" href="#building">
                    Explore what I&apos;m building <span className="arrow">→</span>
                  </a>
                  <a className="btn btn-secondary" href="#work">Work with me</a>
                  <a className="btn btn-link" href="#building">see the lab →</a>
                </div>
              </div>

              <div className="terminal" aria-hidden="true">
                <div className="term-bar">
                  <span className="lights"><span /><span /><span /></span>
                  <span className="title">~/alejandro — whoami</span>
                </div>
                <div className="term-body">
                  <div><span className="prompt">$</span>whoami</div>
                  <div><span className="val">alejandro_ag</span></div>
                  <div><span className="prompt">$</span>cat ./role.txt</div>
                  <div><span className="key">role  </span><span className="val">backend engineer</span></div>
                  <div><span className="key">also  </span><span className="val">automator / ai tinkerer</span></div>
                  <div><span className="key">also  </span><span className="val">melómano</span></div>
                  <div><span className="key">also  </span><span className="val">photographer · travel notes</span></div>
                  <div><span className="prompt">$</span>ls ./current</div>
                  <div><span className="val">apis/ &nbsp; bots/ &nbsp; playlists/ &nbsp; gallery/</span></div>
                  <div><span className="comment"># status: shipping, listening, sorting</span></div>
                  <div><span className="prompt">$</span><span className="cursor" /></div>
                </div>
              </div>
            </div>

            <div className="currently">
              <span className="label">currently:</span>
              <span className="item">connecting APIs</span>
              <span className="item">testing bots</span>
              <span className="item">listening to something weird</span>
              <span className="item">sorting photos</span>
              <span className="item">planning the next trip</span>
            </div>
          </div>
        </section>

        {/* WHAT I DO HERE */}
        <section id="what" className="bg-warm">
          <span className="section-mark">02 / 07</span>
          <div className="wrap">
            <div className="section-head">
              <div>
                <div className="section-label"><span className="num">02</span> What I do here</div>
                <h2 className="h2">
                  A site for the things I build, test, photograph, and <em>overthink</em>.
                </h2>
              </div>
              <p className="lede">
                Some of it is engineering. Some is AI and automation. Some is music discovery, photos, travel notes, or just me sharing things I think are useful, beautiful, or weird enough to deserve a page.
              </p>
            </div>

            <div className="cards-4">
              <article className="card">
                <div className="card-num">01</div>
                <span className="glyph">{"{}"}</span>
                <h3>Systems</h3>
                <p>APIs, automations, internal tools, workflows, and the invisible plumbing that makes things run.</p>
                <div className="card-meta"><span>/labs</span><span className="arrow">→</span></div>
              </article>
              <article className="card">
                <div className="card-num">02</div>
                <span className="glyph">∿</span>
                <h3>AI + Automation</h3>
                <p>Chatbots, agents, routing logic, summaries, knowledge bases, and practical experiments with useful AI.</p>
                <div className="card-meta"><span>/labs/ai</span><span className="arrow">→</span></div>
              </article>
              <article className="card">
                <div className="card-num">03</div>
                <span className="glyph">♪</span>
                <h3>Music + Taste</h3>
                <p>Spotify playlists, tracks worth saving, references, discoveries, and the occasional obsessive recommendation.</p>
                <div className="card-meta"><span>/music</span><span className="arrow">→</span></div>
              </article>
              <article className="card">
                <div className="card-num">04</div>
                <span className="glyph">◐</span>
                <h3>Photos + Travel</h3>
                <p>A few favorite photos, map snippets, personal recommendations, visual notes, and places worth remembering.</p>
                <div className="card-meta"><span>/gallery</span><span className="arrow">→</span></div>
              </article>
            </div>
          </div>
        </section>

        {/* THINGS I'M BUILDING */}
        <section id="building" className="bg-blueprint">
          <span className="section-mark">03 / 07</span>
          <div className="wrap">
            <div className="section-head">
              <div>
                <div className="section-label"><span className="num">03</span> Things I&apos;m building</div>
                <h2 className="h2">
                  A few projects, experiments, and <em>side quests</em> currently orbiting the lab.
                </h2>
              </div>
              <p className="lede">
                This part is the personal changelog. Some things are live, some are half-finished prototypes, some are notes from 2am that somehow became a shipped page.
              </p>
            </div>

            <div className="projects">
              <article className="project">
                <div className="project-top">
                  <span className="project-id">PROJ_01 · /friend</span>
                  <span className="chip live"><span className="dot" />live</span>
                </div>
                <h3>Site for a Friend</h3>
                <p>A practical, warm landing page built for someone else&apos;s project — clear structure, friendly copy, and simple conversion paths without making it feel corporate.</p>
                <div className="project-foot">
                  <a className="cta" href="#">visit project <span className="arrow">↗</span></a>
                  <span className="tags">commission · in-progress</span>
                </div>
              </article>

              <article className="project">
                <div className="project-top">
                  <span className="project-id">PROJ_02 · /openclaw</span>
                  <span className="chip exp"><span className="dot" />experimental</span>
                </div>
                <h3>OpenClaw Telegram Chatbot</h3>
                <p>An open chatbot experiment connected through Telegram — part assistant, part workflow test, part playground for conversational automation.</p>
                <div className="project-foot">
                  <a className="cta" href="#">open in telegram <span className="arrow">↗</span></a>
                  <span className="tags">ai · bots · side-quest</span>
                </div>
              </article>

              <article className="project">
                <div className="project-top">
                  <span className="project-id">PROJ_03 · /labs</span>
                  <span className="chip always"><span className="dot" />always changing</span>
                </div>
                <h3>Internal Tools / Labs</h3>
                <p>Small systems for automation, dashboards, webhook experiments, workflow testing, and personal infrastructure. Built mostly for me, sometimes for friends.</p>
                <div className="project-foot">
                  <a className="cta" href="#">open labs <span className="arrow">→</span></a>
                  <span className="tags">n8n · webhooks · dashboards</span>
                </div>
              </article>

              <article className="project">
                <div className="project-top">
                  <span className="project-id">PROJ_04 · /bots</span>
                  <span className="chip exp"><span className="dot" />experimental</span>
                </div>
                <h3>Open Chatbots</h3>
                <p>Experiments with assistants that can answer, route, summarize, and help people interact with knowledge bases or services without the usual chatbot pain.</p>
                <div className="project-foot">
                  <a className="cta" href="#">see experiments <span className="arrow">→</span></a>
                  <span className="tags">prototype · agents · rag</span>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* CHANNELS */}
        <section id="channels" className="bg-paper">
          <span className="section-mark">04 / 07</span>
          <div className="wrap">
            <div className="section-head">
              <div>
                <div className="section-label"><span className="num">04</span> Not everything here is code</div>
                <h2 className="h2">
                  Sometimes the best systems are <em>playlists</em>, maps, and notes you actually come back to.
                </h2>
              </div>
              <p className="lede">
                I collect music, photos, places, and small recommendations. None of this is teaching anything — it&apos;s curation, taste, and the things I keep sending to friends anyway.
              </p>
            </div>

            <div className="channels">
              {/* MUSIC */}
              <article className="channel ch-music">
                <div className="channel-head">
                  <div>
                    <h3>Music</h3>
                    <p style={{ marginTop: 6 }}>Spotify playlists, tracks I keep coming back to, references, discoveries, things worth listening to closely.</p>
                  </div>
                  <span className="chip live"><span className="dot" />playlist</span>
                </div>

                <div className="playlist">
                  <div className="track now-playing">
                    <span className="idx">01</span>
                    <span className="name"><b>—— track 01</b><small>artist · album</small></span>
                    <span className="bars"><i /><i /><i /></span>
                  </div>
                  <div className="track"><span className="idx">02</span><span className="name"><b>—— track 02</b><small>artist · album</small></span><span className="meta">3:42</span></div>
                  <div className="track"><span className="idx">03</span><span className="name"><b>—— track 03</b><small>artist · album</small></span><span className="meta">4:18</span></div>
                  <div className="track"><span className="idx">04</span><span className="name"><b>—— track 04</b><small>artist · album</small></span><span className="meta">2:55</span></div>
                  <div className="track"><span className="idx">05</span><span className="name"><b>—— track 05</b><small>artist · album</small></span><span className="meta">5:07</span></div>
                </div>

                <div className="channel-foot">
                  <span>+ 47 more · updated weekly</span>
                  <a href="#">open in spotify <span>↗</span></a>
                </div>
              </article>

              {/* PHOTOGRAPHY */}
              <article className="channel ch-photo">
                <div className="channel-head">
                  <div>
                    <h3>Photography</h3>
                    <p style={{ marginTop: 6 }}>A small selection of favorite shots — five favorites here — with a path into a fuller gallery.</p>
                  </div>
                  <span className="chip soon"><span className="dot" />gallery soon</span>
                </div>

                <div className="photo-strip" aria-label="Five favorite photos">
                  <div className="photo"><span>IMG_001</span></div>
                  <div className="photo"><span>IMG_014</span></div>
                  <div className="photo"><span>IMG_022</span></div>
                  <div className="photo"><span>IMG_036</span></div>
                  <div className="photo"><span>IMG_041</span></div>
                </div>

                <div className="channel-foot">
                  <span>5 favorites · 200+ in archive</span>
                  <a href="#">view gallery <span>→</span></a>
                </div>
              </article>

              {/* TRAVEL */}
              <article className="channel ch-travel">
                <div className="channel-head">
                  <div>
                    <h3>Small Travel Advisor</h3>
                    <p style={{ marginTop: 6 }}>Maps, saved spots, tiny recommendations, and travel notes I usually end up sending to friends anyway.</p>
                  </div>
                  <span className="chip soon"><span className="dot" />map notes soon</span>
                </div>

                <div className="map-card">
                  <svg viewBox="0 0 600 380" preserveAspectRatio="xMidYMid slice">
                    <defs>
                      <pattern id="mapgrid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                      </pattern>
                    </defs>
                    <rect width="600" height="380" fill="url(#mapgrid)" />
                    <path
                      d="M 30 220 C 80 180, 140 240, 200 200 S 320 240, 380 180 S 520 220, 580 170"
                      fill="none"
                      stroke="rgba(232,160,92,0.18)"
                      strokeWidth="1.2"
                      strokeDasharray="3 4"
                    />
                    <path
                      d="M 30 100 C 110 130, 180 80, 260 110 S 400 80, 500 120 S 570 90, 600 100"
                      fill="none"
                      stroke="rgba(255,255,255,0.07)"
                      strokeWidth="1"
                    />
                    <path
                      d="M 60 300 Q 200 260 300 290 T 560 280"
                      fill="none"
                      stroke="rgba(255,255,255,0.05)"
                      strokeWidth="1"
                    />
                    <path
                      d="M 100 140 q 40 -30 90 -10 t 80 30 q 10 40 -30 60 t -100 -10 q -50 -20 -40 -70 z"
                      fill="rgba(255,255,255,0.025)"
                      stroke="rgba(255,255,255,0.06)"
                    />
                    <path
                      d="M 360 220 q 60 -50 130 -30 t 90 40 q 20 50 -40 70 t -150 -10 q -50 -30 -30 -70 z"
                      fill="rgba(232,160,92,0.04)"
                      stroke="rgba(232,160,92,0.12)"
                    />
                  </svg>
                  <div className="map-pin" style={{ left: "22%", top: "42%" }} data-label="CDMX" />
                  <div className="map-pin" style={{ left: "58%", top: "32%" }} data-label="Lisbon" />
                  <div className="map-pin" style={{ left: "78%", top: "60%" }} data-label="Mérida" />
                </div>

                <div className="channel-foot">
                  <span>12 saved spots · 4 cities</span>
                  <a href="#">see travel notes <span>→</span></a>
                </div>
              </article>

              {/* NOTES */}
              <article className="channel ch-notes">
                <div className="channel-head">
                  <div>
                    <h3>Notes</h3>
                    <p style={{ marginTop: 6 }}>Ideas, experiments, tools, learnings, and thoughts I don&apos;t want trapped in a chat window.</p>
                  </div>
                  <span className="chip soon"><span className="dot" />drafting</span>
                </div>

                <div className="note-list">
                  <div className="note">
                    <span className="date">05·14</span>
                    <span className="title">Why I stopped writing &lsquo;automation pipelines&rsquo;</span>
                    <span className="tag">draft</span>
                  </div>
                  <div className="note">
                    <span className="date">04·28</span>
                    <span className="title">A telegram bot is a UI, not a feature</span>
                    <span className="tag">draft</span>
                  </div>
                  <div className="note">
                    <span className="date">04·09</span>
                    <span className="title">Three webhook patterns I keep reusing</span>
                    <span className="tag">draft</span>
                  </div>
                  <div className="note future">
                    <span className="date">soon</span>
                    <span className="title">On melomania and signal-to-noise</span>
                    <span className="tag">—</span>
                  </div>
                </div>

                <div className="channel-foot">
                  <span>4 drafts · 0 published · for now</span>
                  <a href="#">read notes <span>→</span></a>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* WORK WITH ME */}
        <section id="work" className="bg-business">
          <span className="section-mark">05 / 07</span>
          <div className="wrap">
            <div className="work-block">
              <div>
                <div className="section-label"><span className="num">05</span> Want to work with me?</div>
                <h2 className="h2">
                  Got a <em>messy workflow</em>?
                </h2>
                <p style={{ marginTop: 20 }}>
                  If you have a process that depends on copy-paste, scattered tools, manual follow-up, or &ldquo;someone just remembers to do it,&rdquo; I can probably help.
                </p>
                <p style={{ marginTop: 14, color: "var(--ink-3)", fontSize: 15 }}>
                  The business side of this site lives in{" "}
                  <span style={{ color: "var(--accent)", fontFamily: "var(--mono)", fontSize: 13.5 }}>/Solutions</span>.
                </p>
                <div className="ctas">
                  <a className="btn btn-primary" href="#contact">
                    Go to Solutions <span className="arrow">→</span>
                  </a>
                  <a className="btn btn-link" href="#contact">or just say hi →</a>
                </div>
              </div>

              <div className="decision">
                <div><span className="com">{"// workflow audit"}</span></div>
                <div><span className="q">&gt;</span> have messy workflow?</div>
                <div><span className="q">&gt;</span> <span className="y">yes</span></div>
                <div><span className="q">&gt;</span> uses copy-paste daily?</div>
                <div><span className="q">&gt;</span> <span className="y">yes</span></div>
                <div><span className="q">&gt;</span> &ldquo;someone just remembers&rdquo;?</div>
                <div><span className="q">&gt;</span> <span className="y">yes</span></div>
                <div><span className="com">{"// manual process detected."}</span></div>
                <div><span className="com">{"// recommended action:"}</span></div>
                <div><span className="out">→ goto /solutions</span></div>
              </div>
            </div>
          </div>
        </section>

        {/* STORY */}
        <section id="story" className="bg-formal">
          <span className="section-mark">06 / 07</span>
          <div className="wrap">
            <div className="section-head" style={{ marginBottom: 40 }}>
              <div>
                <div className="section-label"><span className="num">06</span> A little context</div>
                <h2 className="h2">
                  Backend by trade. Curious <em>builder</em> by default.
                </h2>
              </div>
            </div>

            <div className="story-grid">
              <aside className="story-side">
                <b>Operating from</b>
                Mexico City · CDMX<br />UTC-6 · most days
                <b>Mainly</b>
                backend, integrations, automation, ai workflows
                <b>Also</b>
                music curation, photography, travel notes, occasional shipping at 2am
                <b>Not for sale here</b>
                music lessons, generic ai consulting, agency retainers
                <b>Languages</b>
                español · english · python · typescript · n8n
              </aside>

              <div className="story-prose">
                <p>
                  I&apos;m Alejandro — a backend engineer who got pulled into the world of integrations, automation, and AI because I kept seeing the same problem everywhere: <em>good people stuck doing manual work that a system could help with.</em>
                </p>
                <p>
                  Over time, that turned into a habit. I connect APIs, build workflows, test chatbots, document weird edge cases, and try to make tools that people can actually use — not just demo.
                </p>
                <p>
                  But this site is not only about work. I&apos;m also a <em>melómano</em>, photographer, travel recommender for friends, and someone who enjoys turning small ideas into useful little machines.
                </p>
                <p>
                  So <span style={{ fontFamily: "var(--mono)", fontSize: "0.9em", color: "var(--ink-2)" }}>akiwaky.cloud</span> is part portfolio, part lab, part notebook, part business card — and part excuse to keep building.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="bg-warm">
          <span className="section-mark">07 / 07</span>
          <div className="wrap">
            <div className="section-head">
              <div>
                <div className="section-label"><span className="num">07</span> Say hi</div>
                <h2 className="h2">
                  Send music, a project, a place, or a <em>cursed workflow</em>.
                </h2>
              </div>
              <p className="lede">
                I may reply with a playlist, a diagram, or three questions about your workflow. The business form lives in{" "}
                <span style={{ fontFamily: "var(--mono)", color: "var(--accent)", fontSize: 14 }}>/Solutions</span> — this is just for hellos.
              </p>
            </div>

            <div className="contact-grid">
              <a className="contact-link" href="mailto:hello@akiwaky.cloud">
                <div><div className="lbl">Email</div><div className="val">hello@akiwaky.cloud</div></div>
                <span className="arr">↗</span>
              </a>
              <a className="contact-link" href="https://www.linkedin.com/in/alejandro-ag" target="_blank" rel="noopener noreferrer">
                <div><div className="lbl">LinkedIn</div><div className="val">/in/alejandro-ag</div></div>
                <span className="arr">↗</span>
              </a>
              <a className="contact-link" href="https://github.com/akiwaky" target="_blank" rel="noopener noreferrer">
                <div><div className="lbl">GitHub</div><div className="val">@akiwaky</div></div>
                <span className="arr">↗</span>
              </a>
              <a className="contact-link" href="#">
                <div><div className="lbl">Instagram</div><div className="val">@akiwaky.photo</div></div>
                <span className="arr">↗</span>
              </a>
              <a className="contact-link" href="#">
                <div><div className="lbl">Telegram</div><div className="val">@openclaw_bot</div></div>
                <span className="arr">↗</span>
              </a>
              <a className="contact-link" href="#">
                <div><div className="lbl">Spotify</div><div className="val">akiwaky · playlists</div></div>
                <span className="arr">↗</span>
              </a>
            </div>

            <div className="contact-micro">replies usually within a day · sometimes with a playlist</div>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap">
          <div className="foot-grid">
            <div>
              <div className="foot-brand">akiwaky<span className="em">.cloud</span></div>
              <div className="foot-tag">
                Personal operating system of Alejandro AG. Engineer, automator, melómano, photographer, builder of useful little machines.
              </div>
            </div>
            <div className="foot-col">
              <h4>Site</h4>
              <ul>
                <li><a href="#building">Building</a></li>
                <li><a href="#channels">Music</a></li>
                <li><a href="#channels">Gallery</a></li>
                <li><a href="#channels">Notes</a></li>
              </ul>
            </div>
            <div className="foot-col">
              <h4>Work</h4>
              <ul>
                <li><a href="#work">Solutions</a></li>
                <li><a href="#contact">Say hi</a></li>
                <li><a href="#story">Story</a></li>
              </ul>
            </div>
            <div className="foot-col">
              <h4>Elsewhere</h4>
              <ul>
                <li><a href="https://github.com/akiwaky" target="_blank" rel="noopener noreferrer">GitHub</a></li>
                <li><a href="https://www.linkedin.com/in/alejandro-ag" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                <li><a href="#">Telegram</a></li>
                <li><a href="#">Spotify</a></li>
              </ul>
            </div>
          </div>

          <div className="foot-bottom">
            <span className="build">build v2.0 · last shipped 2026·05·25</span>
            <span>© Alejandro AG · made between commits</span>
            <span>
              press <span className="kbd">/</span> to focus search · <span className="kbd">esc</span> to dismiss
            </span>
          </div>
        </div>
      </footer>

      <ClientScripts />
    </>
  );
}
