"use client";

import { useEffect, useState } from "react";

const tabs = ["About Me", "Projects", "Coffee Reviews", "Music", "Writing"] as const;
type Tab = (typeof tabs)[number];

const tabMeta: Record<Exclude<Tab, "About Me">, { index: string; eyebrow: string; title: string; intro: string }> = {
  Projects: {
    index: "02",
    eyebrow: "Selected work · 2024—2026",
    title: "Systems, stories,\nand useful things.",
    intro: "A selection of product strategy, visual systems, and experiments built to make complicated ideas feel inevitable.",
  },
  "Coffee Reviews": {
    index: "03",
    eyebrow: "A running field guide",
    title: "Coffee, considered.",
    intro: "Notes on places worth crossing town for—judged by the cup, the room, and whether I wanted to stay.",
  },
  Music: {
    index: "04",
    eyebrow: "In rotation · Issue 07",
    title: "What the week\nsounds like.",
    intro: "Albums, mixes, and fragments currently shaping the atmosphere.",
  },
  Writing: {
    index: "05",
    eyebrow: "Notes & observations",
    title: "Ideas in progress.",
    intro: "Essays about design, attention, culture, and the invisible systems underneath everyday life.",
  },
};

const projectCards = [
  ["01", "The Game of the Deal", "Interactive strategy", "A behavioral learning experience that turns enterprise sales strategy into a competitive, memorable game."],
  ["02", "Signal / Noise", "Research system", "A modular insight engine that helps teams find the story hiding inside messy qualitative research."],
  ["03", "Future of Work", "Editorial experience", "A narrative system for making emerging technology feel tangible, human, and actionable."],
];

const coffees = [
  ["9.2", "Sey Coffee", "Bushwick, Brooklyn", "Ethiopia · Hamasho", "Floral, exacting, quietly theatrical."],
  ["8.8", "Suited", "Financial District, Nyc", "Colombia · Pink Bourbon", "A serious cup in an unexpectedly warm room."],
  ["8.6", "La Cabra", "East Village, Nyc", "Kenya · Kii Aa", "Bright acidity, beautiful light, excellent pastry."],
  ["8.3", "Dayglow", "West Hollywood, LA", "Rwanda · Shyira", "Playful, obsessive, and worth the line."],
];

const tracks = [
  ["01", "Eusexua", "Fka twigs", "04:23"],
  ["02", "Baddy on the Floor", "Jamie xx · Honey Dijon", "03:42"],
  ["03", "Anything", "Adrianne Lenker", "03:57"],
  ["04", "Cherry-coloured Funk", "Cocteau Twins", "03:12"],
  ["05", "Sunset", "Caroline Polachek", "02:43"],
];

const essays = [
  ["07.18.26", "The interface is the institution", "How the tools we use quietly determine what organizations believe is possible.", "8 min"],
  ["06.02.26", "Against frictionless everything", "A case for the small moments of resistance that make experiences memorable.", "5 min"],
  ["04.11.26", "Taste is a form of attention", "On references, discernment, and learning to notice what you actually like.", "6 min"],
];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function Home() {
  const [active, setActive] = useState<Tab>("About Me");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      const current = tabs.indexOf(active);
      const next = event.key === "ArrowRight"
        ? (current + 1) % tabs.length
        : (current - 1 + tabs.length) % tabs.length;
      setActive(tabs[next]);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  const selectTab = (tab: Tab) => {
    setActive(tab);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main>
      <header className="site-header">
        <button className="wordmark" onClick={() => selectTab("About Me")} aria-label="Sydney Chin — About Me">
          <span className="mark">S</span>
          <span className="name">Sydney Chin</span>
        </button>
        <nav className={menuOpen ? "nav open" : "nav"} aria-label="Primary navigation">
          {tabs.map((tab, index) => (
            <button
              key={tab}
              className={active === tab ? "nav-item active" : "nav-item"}
              onClick={() => selectTab(tab)}
              aria-current={active === tab ? "page" : undefined}
            >
              <span>0{index + 1}</span>{tab}
            </button>
          ))}
        </nav>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle navigation">
          <span />
          <span />
        </button>
      </header>

      <div className="page-shell" key={active}>
        {active === "About Me" ? <About onNavigate={selectTab} /> : <Collection tab={active} />}
      </div>

      <footer>
        <span>© 2026 Sydney Chin</span>
        <span className="footer-center">New York · 40.7128° N</span>
        <a href="mailto:hello@sydneychin.com">Let&apos;s talk <Arrow /></a>
      </footer>
    </main>
  );
}

function About({ onNavigate }: { onNavigate: (tab: Tab) => void }) {
  const photos = [
    { src: "/photos/placeholder-1.jpg", alt: "A weathered white wall and bench" },
    { src: "/photos/placeholder-2.jpg", alt: "A sunlit courtyard with laundry overhead" },
    { src: "/photos/placeholder-3.jpg", alt: "A modern architectural interior" },
  ];
  const [photo, setPhoto] = useState(0);
  const showPhoto = (next: number) => setPhoto((next + photos.length) % photos.length);

  return (
    <>
      <section className="hero">
        <div className="hero-intro">
          <div className="hero-kicker">About me · Based in Ithaca and New York</div>
          <h1>Hi, my name<br />is <span>Sydney.</span></h1>
          <p>I&apos;m a junior at Cornell studying Information Science.</p>
          <div className="social-links" aria-label="Social links">
            <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">LinkedIn <Arrow /></a>
            <a href="https://www.instagram.com" target="_blank" rel="noreferrer">Instagram <Arrow /></a>
            <a href="mailto:hello@sydneychin.com">Email <Arrow /></a>
          </div>
          <dl className="quick-facts">
            <div>
              <dt>Interests</dt>
              <dd>Coffee · Music · Writing · Travel</dd>
            </div>
            <div>
              <dt>Skills</dt>
              <dd>Strategy · Research · Prototyping · Visual design</dd>
            </div>
          </dl>
        </div>
        <div className="photo-carousel" aria-roledescription="carousel" aria-label="Photo placeholders">
          <div className="photo-frame">
            {photos.map((item, index) => (
              <img
                key={item.src}
                src={item.src}
                alt={item.alt}
                className={index === photo ? "carousel-photo active" : "carousel-photo"}
              />
            ))}
            <span className="photo-placeholder-note">Temporary photo</span>
          </div>
          <div className="carousel-controls">
            <span>{String(photo + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}</span>
            <div>
              <button onClick={() => showPhoto(photo - 1)} aria-label="Previous photo">←</button>
              <button onClick={() => showPhoto(photo + 1)} aria-label="Next photo">→</button>
            </div>
          </div>
        </div>
      </section>

      <section className="experience-section">
        <div className="section-label"><span>01</span> Experience</div>
        <div className="timeline">
          {[
            ["June 2024", "Graduated from Sleepy Hollow High School", "Sleepy Hollow, New York"],
            ["August 2024", "Started at Cornell University", "Began studying Information Science in the College of Agriculture and Life Sciences."],
            ["Summer 2025", "Studied abroad in Taiwan", "Spent the summer learning and living abroad."],
            ["August 2025", "Began sophomore year at Cornell", "Continued exploring technology, design, and human behavior."],
            ["Summer 2026", "Interned at IBM", "Worked on strategy and design projects. More details coming soon."],
            ["August 2026", "Beginning junior year at Cornell", "The next chapter—still in progress."],
          ].map(([date, title, description]) => (
            <article className="timeline-item" key={date}>
              <time>{date}</time>
              <div>
                <h2>{title}</h2>
                <p>{description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="profile-section">
        <div className="section-label"><span>02</span> About</div>
        <div className="profile-copy">
          <p className="lead">I believe the best ideas are both <span>rigorous</span> and a little bit <span>strange.</span></p>
          <div className="profile-columns">
            <p>I turn ambiguity into systems people can understand and use. My work moves between strategy, storytelling, and design—often all at once.</p>
            <p>Outside of work, I&apos;m usually finding an excellent light-roast coffee, building a very specific playlist, or writing down something I noticed.</p>
          </div>
          <button className="text-link" onClick={() => onNavigate("Projects")}>Explore selected work <Arrow /></button>
        </div>
      </section>

      <section className="dispatches">
        <div className="section-label"><span>03</span> Current signals</div>
        <div className="signal-grid">
          {[
            ["Thinking about", "How play changes the way adults learn."],
            ["Listening to", "Eusexua · Fka twigs"],
            ["Drinking", "A washed Ethiopian from Hamasho."],
          ].map(([label, value], index) => (
            <article className="signal-card" key={label}>
              <span>0{index + 1}</span>
              <small>{label}</small>
              <p>{value}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

function Collection({ tab }: { tab: Exclude<Tab, "About Me"> }) {
  const meta = tabMeta[tab];
  return (
    <>
      <section className="collection-hero">
        <div className="collection-index">{meta.index}</div>
        <div>
          <div className="hero-kicker">{meta.eyebrow}</div>
          <h1>{meta.title.split("\n").map((line) => <span key={line}>{line}<br /></span>)}</h1>
        </div>
        <p>{meta.intro}</p>
      </section>
      {tab === "Projects" && <Projects />}
      {tab === "Coffee Reviews" && <Coffee />}
      {tab === "Music" && <Music />}
      {tab === "Writing" && <Writing />}
    </>
  );
}

function Projects() {
  return <section className="project-list">
    {projectCards.map(([number, title, type, copy]) => (
      <article className="project-card" key={title}>
        <div className="project-visual"><span>{number}</span><div className="project-sphere" /></div>
        <div className="project-info"><small>{type}</small><h2>{title}</h2><p>{copy}</p><button aria-label={`Open ${title}`}><Arrow /></button></div>
      </article>
    ))}
  </section>;
}

function Coffee() {
  return <section className="coffee-list">
    <div className="list-head"><span>Score</span><span>Café</span><span>Location / Coffee</span><span>Impression</span></div>
    {coffees.map(([score, cafe, location, coffee, note]) => (
      <article key={cafe}>
        <strong>{score}</strong><h2>{cafe}</h2><div><span>{location}</span><small>{coffee}</small></div><p>{note}</p>
      </article>
    ))}
  </section>;
}

function Music() {
  return <section className="music-layout">
    <div className="album-art"><div className="disc" /><span>Now playing</span><h2>Currents<br />& Signals</h2><small>07 · July 2026</small></div>
    <div className="track-list">
      {tracks.map(([number, title, artist, time]) => <article key={title}><span>{number}</span><div><h3>{title}</h3><small>{artist}</small></div><time>{time}</time><button aria-label={`Play ${title}`}>▶</button></article>)}
    </div>
  </section>;
}

function Writing() {
  return <section className="writing-list">
    {essays.map(([date, title, summary, read]) => <article key={title}><time>{date}</time><h2>{title}</h2><p>{summary}</p><span>{read} read</span><button aria-label={`Read ${title}`}><Arrow /></button></article>)}
    <div className="newsletter"><span>Occasional dispatches</span><h2>Good ideas, infrequently.</h2><p>Notes on things I&apos;m noticing, delivered only when there&apos;s something worth saying.</p><div><input type="email" aria-label="Email address" placeholder="you@email.com" /><button>Subscribe <Arrow /></button></div></div>
  </section>;
}
