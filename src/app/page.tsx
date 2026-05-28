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
            <a href="#building" data-es="proyectos">building</a>
            <a href="#channels" data-es="música">music</a>
            <a href="#channels" data-es="galería">gallery</a>
            <a href="#channels">labs</a>
            <a href="#work" data-es="soluciones">solutions</a>
            <div className="lang-switch" role="group" aria-label="Language">
              <button type="button" className="lang-btn is-active" data-lang="en" aria-pressed="true" title="English">EN</button>
              <button type="button" className="lang-btn" data-lang="es" aria-pressed="false" title="Español">ES</button>
            </div>
            <a href="#contact" className="nav-cta mobile-keep" data-es="salúdame →">say hi →</a>
          </div>
        </div>
      </nav>

      <main id="top">
        {/* HERO */}
        <section className="hero bg-warm">
          <div className="wrap">
            <div className="hero-top">
              <div className="hero-meta">
                <span className="chip"><span className="dot" /><span data-es="en línea · construyendo cosas">online · shipping things</span></span>
                <span style={{ color: "var(--ink-4)" }}>/ Mexico City — UTC-6</span>
              </div>
              <div className="hero-stamp" data-es="akiwaky.cloud · v2 · página personal">akiwaky.cloud · v2 · personal page</div>
            </div>

            <h1 className="name-display" aria-label="Alejandro AG">
              <span className="line1">Alejandro</span>
              <span className="line2">
                AG<span className="period">.</span>
              </span>
            </h1>

            <p className="name-subtitle" data-es="Constructor de pequeñas <em>máquinas útiles</em>.">
              Builder of useful <em>little machines</em>.
            </p>

            <div className="hero-grid reveal" style={{ margin: "86px 0 0" }}>
              <div className="hero-left">
                <div className="roles">
                  <span data-es="ingeniero">engineer</span><span className="sep">·</span>
                  <span data-es="automatizador">automator</span><span className="sep">·</span>
                  <span>melómano</span><span className="sep">·</span>
                  <span data-es="fotógrafo">photographer</span><span className="sep">·</span>
                  <span data-es="asesor de viaje ocasional">occasional travel advisor</span>
                </div>

                <p className="hero-desc" data-es="Este es mi rincón en internet — parte portafolio, parte laboratorio, parte tarjeta de presentación, parte <span class=&quot;quiet&quot;>&ldquo;tuve una idea a la 1:37am y la publiqué.&rdquo;</span>">
                  This is my corner of the internet — part portfolio, part lab, part business card, part{" "}
                  <span className="quiet">&ldquo;I had an idea at 1:37am and shipped it.&rdquo;</span>
                </p>

                <div className="ctas">
                  <a className="btn btn-primary" href="#building" data-es="Explora lo que estoy construyendo <span class=&quot;arrow&quot;>→</span>">
                    Explore what I&apos;m building <span className="arrow">→</span>
                  </a>
                  <a className="btn btn-secondary" href="#work" data-es="Trabaja conmigo">Work with me</a>
                  <a className="btn btn-link" href="#building" data-es="ver el lab →">see the lab →</a>
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
                  <div><span className="key">role  </span><span className="val" data-es="ingeniero backend">backend engineer</span></div>
                  <div><span className="key">also  </span><span className="val" data-es="automatizador / experimentador de IA">automator / ai tinkerer</span></div>
                  <div><span className="key">also  </span><span className="val">melómano</span></div>
                  <div><span className="key">also  </span><span className="val" data-es="fotógrafo · notas de viaje">photographer · travel notes</span></div>
                  <div><span className="prompt">$</span>ls ./current</div>
                  <div><span className="val">apis/ &nbsp; bots/ &nbsp; playlists/ &nbsp; gallery/</span></div>
                  <div><span className="comment" data-es="# estado: construyendo, escuchando, ordenando"># status: shipping, listening, sorting</span></div>
                  <div><span className="prompt">$</span><span className="cursor" /></div>
                </div>
              </div>
            </div>

            <div className="currently reveal">
              <span className="label" data-es="actualmente:">currently:</span>
              <span className="item" data-es="conectando APIs">connecting APIs</span>
              <span className="item" data-es="probando bots">testing bots</span>
              <span className="item" data-es="escuchando algo raro">listening to something weird</span>
              <span className="item" data-es="ordenando fotos">sorting photos</span>
              <span className="item" data-es="planeando el próximo viaje">planning the next trip</span>
            </div>
          </div>
        </section>

        {/* WHAT I DO HERE */}
        <section id="what" className="bg-warm">
          <span className="section-mark">02 / 07</span>
          <div className="wrap">
            <div className="section-head reveal">
              <div>
                <div className="section-label"><span className="num">02</span><span data-es=" Qué hago aquí"> What I do here</span></div>
                <h2 className="h2" data-es="Un sitio para las cosas que construyo, pruebo, fotografío y <em>sobreanálizo</em>.">
                  A site for the things I build, test, photograph, and <em>overthink</em>.
                </h2>
              </div>
              <p className="lede" data-es="Parte es ingeniería. Parte es IA y automatización. Parte es descubrimiento musical, fotos, notas de viaje, o simplemente compartir cosas que considero útiles, bellas o lo suficientemente raras para merecer una página.">
                Some of it is engineering. Some is AI and automation. Some is music discovery, photos, travel notes, or just me sharing things I think are useful, beautiful, or weird enough to deserve a page.
              </p>
            </div>

            <div className="cards-4">
              <article className="card reveal" style={{ "--reveal-delay": "0s" } as React.CSSProperties}>
                <div className="card-num">01</div>
                <span className="glyph">{"{}"}</span>
                <h3 data-es="Sistemas">Systems</h3>
                <p data-es="APIs, automatizaciones, herramientas internas, flujos de trabajo y la fontanería invisible que hace que las cosas funcionen.">APIs, automations, internal tools, workflows, and the invisible plumbing that makes things run.</p>
                <div className="card-meta"><span>/labs</span><span className="arrow">→</span></div>
              </article>
              <article className="card reveal" style={{ "--reveal-delay": "0.06s" } as React.CSSProperties}>
                <div className="card-num">02</div>
                <span className="glyph">∿</span>
                <h3>AI + Automation</h3>
                <p data-es="Chatbots, agentes, lógica de enrutamiento, resúmenes, bases de conocimiento y experimentos prácticos con IA útil.">Chatbots, agents, routing logic, summaries, knowledge bases, and practical experiments with useful AI.</p>
                <div className="card-meta"><span>/labs/ai</span><span className="arrow">→</span></div>
              </article>
              <article className="card reveal" style={{ "--reveal-delay": "0.12s" } as React.CSSProperties}>
                <div className="card-num">03</div>
                <span className="glyph">♪</span>
                <h3 data-es="Música + Gusto">Music + Taste</h3>
                <p data-es="Playlists de Spotify, tracks que vale guardar, referencias, descubrimientos y la ocasional recomendación obsesiva.">Spotify playlists, tracks worth saving, references, discoveries, and the occasional obsessive recommendation.</p>
                <div className="card-meta"><span>/music</span><span className="arrow">→</span></div>
              </article>
              <article className="card reveal" style={{ "--reveal-delay": "0.18s" } as React.CSSProperties}>
                <div className="card-num">04</div>
                <span className="glyph">◐</span>
                <h3 data-es="Fotos + Viajes">Photos + Travel</h3>
                <p data-es="Algunas fotos favoritas, fragmentos de mapas, recomendaciones personales, notas visuales y lugares que vale recordar.">A few favorite photos, map snippets, personal recommendations, visual notes, and places worth remembering.</p>
                <div className="card-meta"><span>/gallery</span><span className="arrow">→</span></div>
              </article>
            </div>
          </div>
        </section>

        {/* THINGS I'M BUILDING */}
        <section id="building" className="bg-blueprint">
          <span className="section-mark">03 / 07</span>
          <div className="wrap">
            <div className="section-head reveal">
              <div>
                <div className="section-label"><span className="num">03</span><span data-es=" Lo que estoy construyendo"> Things I&apos;m building</span></div>
                <h2 className="h2" data-es="Algunos proyectos, experimentos y <em>misiones paralelas</em> orbitando el laboratorio.">
                  A few projects, experiments, and <em>side quests</em> currently orbiting the lab.
                </h2>
              </div>
              <p className="lede" data-es="Esta parte es el changelog personal. Algunas cosas están en vivo, otras son prototipos a medias, algunas son notas de las 2am que de algún modo se convirtieron en una página publicada.">
                This part is the personal changelog. Some things are live, some are half-finished prototypes, some are notes from 2am that somehow became a shipped page.
              </p>
            </div>

            <div className="projects">
              <article className="project reveal" style={{ "--reveal-delay": "0s" } as React.CSSProperties}>
                <div className="project-top">
                  <span className="project-id">PROJ_01 · /friend</span>
                  <span className="chip live"><span className="dot" />live</span>
                </div>
                <h3 data-es="Sitio para una Amiga">Site for a Friend</h3>
                <p data-es="Una landing page práctica y cálida construida para el proyecto de alguien más — estructura clara, copy amigable y conversiones simples sin que se sienta corporativo.">A practical, warm landing page built for someone else&apos;s project — clear structure, friendly copy, and simple conversion paths without making it feel corporate.</p>
                <div className="project-foot">
                  <a className="cta" href="https://arletayala.art/" target="_blank" rel="noopener noreferrer" data-es="visitar proyecto <span class=&quot;arrow&quot;>↗</span>">visit project <span className="arrow">↗</span></a>
                  <span className="tags" data-es="comisión · en progreso">commission · in-progress</span>
                </div>
              </article>

              <article className="project reveal" style={{ "--reveal-delay": "0.08s" } as React.CSSProperties}>
                <div className="project-top">
                  <span className="project-id">PROJ_02 · /openclaw</span>
                  <span className="chip exp"><span className="dot" />experimental</span>
                </div>
                <h3>OpenClaw Telegram Chatbot</h3>
                <p data-es="Un experimento de chatbot abierto conectado a través de Telegram — parte asistente, parte prueba de flujo, parte playground para automatización conversacional.">An open chatbot experiment connected through Telegram — part assistant, part workflow test, part playground for conversational automation.</p>
                <div className="project-foot">
                  <a className="cta" href="#" data-es="abrir en telegram <span class=&quot;arrow&quot;>↗</span>">open in telegram <span className="arrow">↗</span></a>
                  <span className="tags" data-es="ai · bots · misión paralela">ai · bots · side-quest</span>
                </div>
              </article>

              <article className="project reveal" style={{ "--reveal-delay": "0.16s" } as React.CSSProperties}>
                <div className="project-top">
                  <span className="project-id">PROJ_03 · /labs</span>
                  <span className="chip always"><span className="dot" />always changing</span>
                </div>
                <h3 data-es="Herramientas Internas / Labs">Internal Tools / Labs</h3>
                <p data-es="Sistemas pequeños para automatización, dashboards, experimentos con webhooks, pruebas de flujos e infraestructura personal. Construido principalmente para mí, a veces para amigos.">Small systems for automation, dashboards, webhook experiments, workflow testing, and personal infrastructure. Built mostly for me, sometimes for friends.</p>
                <div className="project-foot">
                  <a className="cta" href="#" data-es="abrir labs <span class=&quot;arrow&quot;>→</span>">open labs <span className="arrow">→</span></a>
                  <span className="tags">n8n · webhooks · dashboards</span>
                </div>
              </article>

              <article className="project reveal" style={{ "--reveal-delay": "0.24s" } as React.CSSProperties}>
                <div className="project-top">
                  <span className="project-id">PROJ_04 · /bots</span>
                  <span className="chip exp"><span className="dot" />experimental</span>
                </div>
                <h3 data-es="Chatbots Abiertos">Open Chatbots</h3>
                <p data-es="Experimentos con asistentes que pueden responder, enrutar, resumir y ayudar a la gente a interactuar con bases de conocimiento o servicios sin el dolor típico de los chatbots.">Experiments with assistants that can answer, route, summarize, and help people interact with knowledge bases or services without the usual chatbot pain.</p>
                <div className="project-foot">
                  <a className="cta" href="#" data-es="ver experimentos <span class=&quot;arrow&quot;>→</span>">see experiments <span className="arrow">→</span></a>
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
            <div className="section-head reveal">
              <div>
                <div className="section-label"><span className="num">04</span><span data-es=" No todo aquí es código"> Not everything here is code</span></div>
                <h2 className="h2" data-es="A veces los mejores sistemas son <em>playlists</em>, mapas y notas a las que realmente vuelves.">
                  Sometimes the best systems are <em>playlists</em>, maps, and notes you actually come back to.
                </h2>
              </div>
              <p className="lede" data-es="Colecciono música, fotos, lugares y pequeñas recomendaciones. Nada de esto enseña nada — es curación, gusto y las cosas que de todas formas le sigo enviando a los amigos.">
                I collect music, photos, places, and small recommendations. None of this is teaching anything — it&apos;s curation, taste, and the things I keep sending to friends anyway.
              </p>
            </div>

            <div className="channels">
              {/* MUSIC */}
              <article className="channel ch-music reveal" style={{ "--reveal-delay": "0s" } as React.CSSProperties}>
                <div className="channel-head">
                  <div>
                    <h3 data-es="Música">Music</h3>
                    <p style={{ marginTop: 6 }} data-es="Playlists de Spotify, tracks a los que sigo volviendo, referencias, descubrimientos, cosas que vale escuchar con atención.">Spotify playlists, tracks I keep coming back to, references, discoveries, things worth listening to closely.</p>
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
                  <span data-es="+ 47 más · actualizado semanalmente">+ 47 more · updated weekly</span>
                  <a href="#" data-es="abrir en spotify <span>↗</span>">open in spotify <span>↗</span></a>
                </div>
              </article>

              {/* PHOTOGRAPHY */}
              <article className="channel ch-photo reveal" style={{ "--reveal-delay": "0.08s" } as React.CSSProperties}>
                <div className="channel-head">
                  <div>
                    <h3 data-es="Fotografía">Photography</h3>
                    <p style={{ marginTop: 6 }} data-es="Una pequeña selección de fotos favoritas — cinco aquí — con acceso a una galería más completa.">A small selection of favorite shots — five favorites here — with a path into a fuller gallery.</p>
                  </div>
                  <span className="chip soon"><span className="dot" /><span data-es="galería pronto">gallery soon</span></span>
                </div>

                <div className="photo-strip" aria-label="Five favorite photos">
                  <div className="photo"><span>IMG_001</span></div>
                  <div className="photo"><span>IMG_014</span></div>
                  <div className="photo"><span>IMG_022</span></div>
                  <div className="photo"><span>IMG_036</span></div>
                  <div className="photo"><span>IMG_041</span></div>
                </div>

                <div className="channel-foot">
                  <span data-es="5 favoritas · 200+ en archivo">5 favorites · 200+ in archive</span>
                  <a href="#" data-es="ver galería <span>→</span>">view gallery <span>→</span></a>
                </div>
              </article>

              {/* TRAVEL */}
              <article className="channel ch-travel reveal" style={{ "--reveal-delay": "0.16s" } as React.CSSProperties}>
                <div className="channel-head">
                  <div>
                    <h3 data-es="Pequeño Asesor de Viaje">Small Travel Advisor</h3>
                    <p style={{ marginTop: 6 }} data-es="Mapas, lugares guardados, pequeñas recomendaciones y notas de viaje que normalmente termino enviándole a los amigos.">Maps, saved spots, tiny recommendations, and travel notes I usually end up sending to friends anyway.</p>
                  </div>
                  <span className="chip soon"><span className="dot" /><span data-es="notas de mapa pronto">map notes soon</span></span>
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
                  <span data-es="12 lugares guardados · 4 ciudades">12 saved spots · 4 cities</span>
                  <a href="#" data-es="ver notas de viaje <span>→</span>">see travel notes <span>→</span></a>
                </div>
              </article>

              {/* NOTES */}
              <article className="channel ch-notes reveal" style={{ "--reveal-delay": "0.24s" } as React.CSSProperties}>
                <div className="channel-head">
                  <div>
                    <h3 data-es="Notas">Notes</h3>
                    <p style={{ marginTop: 6 }} data-es="Ideas, experimentos, herramientas, aprendizajes y pensamientos que no quiero atrapados en una ventana de chat.">Ideas, experiments, tools, learnings, and thoughts I don&apos;t want trapped in a chat window.</p>
                  </div>
                  <span className="chip soon"><span className="dot" /><span data-es="borrando">drafting</span></span>
                </div>

                <div className="note-list">
                  <div className="note">
                    <span className="date">05·14</span>
                    <span className="title" data-es="Por qué dejé de escribir &lsquo;pipelines de automatización&rsquo;">Why I stopped writing &lsquo;automation pipelines&rsquo;</span>
                    <span className="tag">draft</span>
                  </div>
                  <div className="note">
                    <span className="date">04·28</span>
                    <span className="title" data-es="Un bot de Telegram es una UI, no una característica">A telegram bot is a UI, not a feature</span>
                    <span className="tag">draft</span>
                  </div>
                  <div className="note">
                    <span className="date">04·09</span>
                    <span className="title" data-es="Tres patrones de webhook que sigo reutilizando">Three webhook patterns I keep reusing</span>
                    <span className="tag">draft</span>
                  </div>
                  <div className="note future">
                    <span className="date">soon</span>
                    <span className="title" data-es="Sobre la melomanía y la relación señal-ruido">On melomania and signal-to-noise</span>
                    <span className="tag">—</span>
                  </div>
                </div>

                <div className="channel-foot">
                  <span data-es="4 borradores · 0 publicados · por ahora">4 drafts · 0 published · for now</span>
                  <a href="#" data-es="leer notas <span>→</span>">read notes <span>→</span></a>
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
              <div className="reveal">
                <div className="section-label"><span className="num">05</span><span data-es=" ¿Quieres trabajar conmigo?"> Want to work with me?</span></div>
                <h2 className="h2" data-es="¿Tienes un <em>flujo de trabajo desordenado</em>?">
                  Got a <em>messy workflow</em>?
                </h2>
                <p style={{ marginTop: 20 }} data-es="Si tienes un proceso que depende del copy-paste, herramientas dispersas, seguimiento manual o &ldquo;alguien simplemente lo recuerda&rdquo;, probablemente puedo ayudar.">
                  If you have a process that depends on copy-paste, scattered tools, manual follow-up, or &ldquo;someone just remembers to do it,&rdquo; I can probably help.
                </p>
                <p style={{ marginTop: 14, color: "var(--ink-3)", fontSize: 15 }} data-es="El lado comercial de este sitio vive en <span style=&quot;color:var(--accent);font-family:var(--mono);font-size:13.5px&quot;>/Soluciones</span>.">
                  The business side of this site lives in{" "}
                  <span style={{ color: "var(--accent)", fontFamily: "var(--mono)", fontSize: 13.5 }}>/Solutions</span>.
                </p>
                <div className="ctas">
                  <a className="btn btn-primary" href="#contact" data-es="Ir a Soluciones <span class=&quot;arrow&quot;>→</span>">
                    Go to Solutions <span className="arrow">→</span>
                  </a>
                  <a className="btn btn-link" href="#contact" data-es="o simplemente salúdame →">or just say hi →</a>
                </div>
              </div>

              <div className="decision">
                <div><span className="com" data-es="// auditoría de flujo">{"// workflow audit"}</span></div>
                <div><span className="q">&gt;</span><span data-es=" ¿flujo desordenado?"> have messy workflow?</span></div>
                <div><span className="q">&gt;</span> <span className="y">yes</span></div>
                <div><span className="q">&gt;</span><span data-es=" ¿usa copy-paste diariamente?"> uses copy-paste daily?</span></div>
                <div><span className="q">&gt;</span> <span className="y">yes</span></div>
                <div><span className="q">&gt;</span><span data-es=" &ldquo;alguien simplemente lo recuerda&rdquo;?"> &ldquo;someone just remembers&rdquo;?</span></div>
                <div><span className="q">&gt;</span> <span className="y">yes</span></div>
                <div><span className="com" data-es="// proceso manual detectado.">{"// manual process detected."}</span></div>
                <div><span className="com" data-es="// acción recomendada:">{"// recommended action:"}</span></div>
                <div><span className="out">→ goto /solutions</span></div>
              </div>
            </div>
          </div>
        </section>

        {/* STORY */}
        <section id="story" className="bg-formal">
          <span className="section-mark">06 / 07</span>
          <div className="wrap">
            <div className="section-head reveal" style={{ marginBottom: 40 }}>
              <div>
                <div className="section-label"><span className="num">06</span><span data-es=" Un poco de contexto"> A little context</span></div>
                <h2 className="h2" data-es="Backend de oficio. <em>Constructor</em> curioso por defecto.">
                  Backend by trade. Curious <em>builder</em> by default.
                </h2>
              </div>
            </div>

            <div className="story-grid">
              <aside className="story-side reveal">
                <b data-es="Operando desde">Operating from</b>
                <span data-es="Mexico City · CDMX<br />UTC-6 · la mayoría de los días">Mexico City · CDMX<br />UTC-6 · most days</span>
                <b data-es="Principalmente">Mainly</b>
                <span data-es="backend, integraciones, automatización, flujos de IA">backend, integrations, automation, ai workflows</span>
                <b data-es="También">Also</b>
                <span data-es="curación musical, fotografía, notas de viaje, shipping ocasional a las 2am">music curation, photography, travel notes, occasional shipping at 2am</span>
                <b data-es="No en venta aquí">Not for sale here</b>
                <span data-es="clases de música, consultoría genérica de IA, retainers de agencia">music lessons, generic ai consulting, agency retainers</span>
                <b data-es="Lenguajes">Languages</b>
                <span>español · english · python · typescript · n8n</span>
              </aside>

              <div className="story-prose reveal">
                <p data-es="Soy Alejandro — un ingeniero backend que fue atraído al mundo de las integraciones, automatización e IA porque seguía viendo el mismo problema en todos lados: <em>personas talentosas atascadas haciendo trabajo manual que un sistema podría resolver.</em>">
                  I&apos;m Alejandro — a backend engineer who got pulled into the world of integrations, automation, and AI because I kept seeing the same problem everywhere: <em>good people stuck doing manual work that a system could help with.</em>
                </p>
                <p data-es="Con el tiempo, eso se convirtió en un hábito. Conecto APIs, construyo flujos, pruebo chatbots, documento casos borde raros e intento hacer herramientas que la gente realmente pueda usar — no solo demostrar.">
                  Over time, that turned into a habit. I connect APIs, build workflows, test chatbots, document weird edge cases, and try to make tools that people can actually use — not just demo.
                </p>
                <p data-es="Pero este sitio no es solo sobre trabajo. También soy <em>melómano</em>, fotógrafo, recomendador de viajes para amigos y alguien que disfruta convertir pequeñas ideas en máquinas útiles.">
                  But this site is not only about work. I&apos;m also a <em>melómano</em>, photographer, travel recommender for friends, and someone who enjoys turning small ideas into useful little machines.
                </p>
                <p data-es="Así que <span style=&quot;font-family:var(--mono);font-size:0.9em;color:var(--ink-2)&quot;>akiwaky.cloud</span> es parte portafolio, parte laboratorio, parte libreta, parte tarjeta de presentación — y parte excusa para seguir construyendo.">
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
            <div className="section-head reveal">
              <div>
                <div className="section-label"><span className="num">07</span><span data-es=" Salúdame"> Say hi</span></div>
                <h2 className="h2" data-es="Mándame música, un proyecto, un lugar o un <em>flujo de trabajo maldito</em>.">
                  Send music, a project, a place, or a <em>cursed workflow</em>.
                </h2>
              </div>
              <p className="lede" data-es="Puede que responda con una playlist, un diagrama o tres preguntas sobre tu flujo. El formulario de negocio vive en <span style=&quot;font-family:var(--mono);color:var(--accent);font-size:14px&quot;>/Soluciones</span> — esto es solo para saludos.">
                I may reply with a playlist, a diagram, or three questions about your workflow. The business form lives in{" "}
                <span style={{ fontFamily: "var(--mono)", color: "var(--accent)", fontSize: 14 }}>/Solutions</span> — this is just for hellos.
              </p>
            </div>

            <div className="contact-grid">
              <a className="contact-link reveal" href="mailto:hello@akiwaky.cloud" style={{ "--reveal-delay": "0s" } as React.CSSProperties}>
                <div><div className="lbl">Email</div><div className="val">hello@akiwaky.cloud</div></div>
                <span className="arr">↗</span>
              </a>
              <a className="contact-link reveal" href="https://www.linkedin.com/in/alejandro-ag" target="_blank" rel="noopener noreferrer" style={{ "--reveal-delay": "0.05s" } as React.CSSProperties}>
                <div><div className="lbl">LinkedIn</div><div className="val">/in/alejandro-ag</div></div>
                <span className="arr">↗</span>
              </a>
              <a className="contact-link reveal" href="https://github.com/akiwaky" target="_blank" rel="noopener noreferrer" style={{ "--reveal-delay": "0.1s" } as React.CSSProperties}>
                <div><div className="lbl">GitHub</div><div className="val">@akiwaky</div></div>
                <span className="arr">↗</span>
              </a>
              <a className="contact-link reveal" href="#" style={{ "--reveal-delay": "0.15s" } as React.CSSProperties}>
                <div><div className="lbl">Instagram</div><div className="val">@akiwaky.photo</div></div>
                <span className="arr">↗</span>
              </a>
              <a className="contact-link reveal" href="#" style={{ "--reveal-delay": "0.2s" } as React.CSSProperties}>
                <div><div className="lbl">Telegram</div><div className="val">@openclaw_bot</div></div>
                <span className="arr">↗</span>
              </a>
              <a className="contact-link reveal" href="#" style={{ "--reveal-delay": "0.25s" } as React.CSSProperties}>
                <div><div className="lbl">Spotify</div><div className="val">akiwaky · playlists</div></div>
                <span className="arr">↗</span>
              </a>
            </div>

            <div className="contact-micro" data-es="respondo generalmente en un día · a veces con una playlist">replies usually within a day · sometimes with a playlist</div>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap">
          <div className="foot-grid">
            <div>
              <div className="foot-brand">akiwaky<span className="em">.cloud</span></div>
              <div className="foot-tag" data-es="Sistema operativo personal de Alejandro AG. Ingeniero, automatizador, melómano, fotógrafo, constructor de pequeñas máquinas útiles.">
                Personal operating system of Alejandro AG. Engineer, automator, melómano, photographer, builder of useful little machines.
              </div>
            </div>
            <div className="foot-col">
              <h4 data-es="Sitio">Site</h4>
              <ul>
                <li><a href="#building" data-es="Proyectos">Building</a></li>
                <li><a href="#channels" data-es="Música">Music</a></li>
                <li><a href="#channels" data-es="Galería">Gallery</a></li>
                <li><a href="#channels" data-es="Notas">Notes</a></li>
              </ul>
            </div>
            <div className="foot-col">
              <h4 data-es="Trabajo">Work</h4>
              <ul>
                <li><a href="#work" data-es="Soluciones">Solutions</a></li>
                <li><a href="#contact" data-es="Salúdame">Say hi</a></li>
                <li><a href="#story" data-es="Historia">Story</a></li>
              </ul>
            </div>
            <div className="foot-col">
              <h4 data-es="Más lugares">Elsewhere</h4>
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
            <span data-es="© Alejandro AG · hecho entre commits">© Alejandro AG · made between commits</span>
            <span data-es="presiona <span class=&quot;kbd&quot;>/</span> para buscar · <span class=&quot;kbd&quot;>esc</span> para cerrar">
              press <span className="kbd">/</span> to focus search · <span className="kbd">esc</span> to dismiss
            </span>
          </div>
        </div>
      </footer>

      <ClientScripts />
    </>
  );
}
