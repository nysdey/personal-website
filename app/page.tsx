"use client";

import { useEffect, useState } from "react";

const tabs = ["About Me", "Projects", "Music"] as const;
type Tab = (typeof tabs)[number];

const tabMeta: Record<Exclude<Tab, "About Me">, { eyebrow: string; title: string; intro: string }> = {
  Projects: {
    eyebrow: "Selected work · 2025—2026",
    title: "Systems, tools,\nand useful things.",
    intro: "Products and analyses built to take something tedious or messy and make the next decision obvious.",
  },
  Music: {
    eyebrow: "In rotation · Issue 07",
    title: "What the week\nsounds like.",
    intro: "Albums, mixes, and fragments currently shaping the atmosphere.",
  },
};

const projectCards = [
  {
    title: "BobBee",
    type: "Automated intelligent sales outreach · July 2026",
    copy: "Streamlines signal sources and uses watsonx.ai to build a prioritized outreach schedule with AI-generated emails based on real-time signals and seller preferences. It learns from seller feedback and refreshes strategy ad hoc to stay current.",
    tags: ["watsonx.ai", "Next.js", "TypeScript"],
    links: [
      { label: "GitHub", href: "https://github.com/nysdey/ibm-watsonx-challenge" },
      { label: "Demo", href: "https://www.youtube.com/watch?v=FgoginwGPZo" },
    ],
  },
  {
    title: "IBM Hive",
    type: "Seller organization & relationship manager · July 2026",
    copy: "A seller-enablement platform that acts as a source of truth for organizational mapping, team pairings, territory coverage, and pipeline—so reps stop guessing who owns what.",
    tags: ["React", "Express", "PostgreSQL"],
    links: [{ label: "GitHub", href: "https://github.com/nysdey/ibm-hive" }],
  },
  {
    title: "County-Level Health & Community Factors",
    type: "Data analysis · Fall 2025",
    copy: "Modeled relationships between environmental, socioeconomic, and behavioral factors and mental and physical health outcomes across U.S. counties, identifying environmental accessibility as a potential policy lever.",
    tags: ["Python", "Pandas", "Statsmodels"],
    links: [{ label: "GitHub", href: "https://github.com/yanwe1/county_health_factors" }],
  },
];

const timeline = [
  {
    date: "Aug 2026 — Present",
    title: "Cornell Campus Ambassador",
    org: "IBM · Ithaca, NY",
    copy: "Serve as a liaison between IBM and Cornell, bringing IBM SkillsBuild and watsonx Bob learning opportunities to campus. Expanding and piloting the ambassador program, and collaborating with Hack4Impact on sponsored events like Bobathons, SkillsBuild workshops, and campus AI-learning events.",
  },
  {
    date: "May 2026 — Present",
    title: "Technical Product Manager",
    org: "Cornell Hack4Impact · Ithaca, NY",
    copy: "Lead a subteam of designers and developers building an AI-powered platform that helps families in Congo maintain their crops after volunteer farmers leave. Own the PRD, SDD, and semester roadmap; write and assign tickets weekly; meet with clients weekly.",
  },
  {
    date: "May 2026 — Aug 2026",
    title: "Technical Sales Solutions Intern",
    org: "IBM · Brookhaven, GA",
    copy: "Interviewed sellers to find workflow bottlenecks, then wrote and tested outreach scripts and analyzed results by industry, IT spend, and revenue. Built internal tools to automate personalized outreach and authored documentation handed to the Senior State Executive/VP. Led live watsonx Bob demos at the in-person WatsonX event. Ranked top five among interns: 11.1% call-connection rate, 2.4% positive-call rate.",
  },
  {
    date: "Feb 2026 — May 2026",
    title: "Product Strategist & Developer",
    org: "Cornell Hack4Impact · Ithaca, NY",
    copy: "Sourced and vetted social-impact nonprofits, led exploratory calls, and drafted technical solution outlines. Shipped features for the Endowment Manager (a full-stack PERN app for small nonprofits) and built inventory management for the Hudson Valley Textile Project's Northeast Fiber Exchange, tracking wool expiration and delivering real-time inventory during sales.",
  },
  {
    date: "Dec 2025 — Feb 2026",
    title: "Business Analyst Intern",
    org: "Timing LLC · Remote",
    copy: "Built WAU engagement models, ideal customer profiles, and user surveys. Developed a campus acquisition plan, led sponsorship outreach, and wrote the newsletter.",
  },
  {
    date: "Aug 2024 — Dec 2025",
    title: "Research Assistant",
    org: "Cornell Phonetics Lab · Ithaca, NY",
    copy: "Analyzed speech-transcript data with Python, NumPy, SciPy, and Matplotlib. Built a reproducible TextGrid-processing workflow and mentored seven research assistants.",
  },
  {
    date: "Aug 2024 — Dec 2027",
    title: "Cornell University",
    org: "Bowers College of Computing and Information Sciences",
    copy: "B.A. in Information Science, concentrating in Networks, Crowds, and Markets. GPA 3.5. Coursework in business intelligence systems, object-oriented programming and data structures, data science in Python, probability and statistics, econometrics, and information ethics, law, and policy.",
  },
];

const skillGroups = [
  ["Programming & web", "Python · Java · JavaScript · TypeScript · R · SQL"],
  ["Frameworks", "React · Next.js · Express · Flask · HTML/CSS"],
  ["Data & analysis", "Pandas · NumPy · SciPy · Scikit-learn · Statsmodels · Matplotlib · Plotly"],
  ["Tools & platforms", "PostgreSQL · Firebase · Git · Figma · watsonx · Salesforce · Salesloft"],
  ["Product", "PRDs & SDDs · Roadmapping · Agile sprints · Client discovery · User research"],
];

const tracks = [
  ["01", "Eusexua", "Fka twigs", "04:23"],
  ["02", "Baddy on the Floor", "Jamie xx · Honey Dijon", "03:42"],
  ["03", "Anything", "Adrianne Lenker", "03:57"],
  ["04", "Cherry-coloured Funk", "Cocteau Twins", "03:12"],
  ["05", "Sunset", "Caroline Polachek", "02:43"],
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
          <span className="name">Sydney Chin</span>
        </button>
        <nav className={menuOpen ? "nav open" : "nav"} aria-label="Primary navigation">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={active === tab ? "nav-item active" : "nav-item"}
              onClick={() => selectTab(tab)}
              aria-current={active === tab ? "page" : undefined}
            >
              {tab}
            </button>
          ))}
        </nav>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle navigation">
          <span />
          <span />
        </button>
      </header>

      <div className="page-shell" key={active}>
        {active === "About Me" ? <About /> : <Collection tab={active} />}
      </div>

      <footer>
        <span>© 2026 Sydney Chin</span>
        <span className="footer-center">Ithaca, NY</span>
      </footer>
    </main>
  );
}

function About() {
  const photos = [
    { src: "/media/sydney-with-bob.jpg", alt: "Sydney holding a Bob cutout at the IBMer watsonx Challenge", position: "48% center" },
    { src: "/media/ropes.JPG", alt: "Sydney climbing a rope structure in the evening sunshine", position: "center center" },
    { src: "/media/ai-engineer.png", alt: "Sydney with a colleague at the watsonx event", position: "85% center" },
    { src: "/media/curvy-tree.jpg", alt: "Sydney standing beside a curved evergreen tree on campus", position: "center center" },
  ];
  const [photo, setPhoto] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => setPlaying(!preference.matches);
    syncMotion();
    preference.addEventListener("change", syncMotion);
    return () => preference.removeEventListener("change", syncMotion);
  }, []);

  useEffect(() => {
    if (!playing || hovered) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) setPhoto((current) => (current + 1) % photos.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [playing, hovered, photos.length]);

  const showPhoto = (next: number) => setPhoto((next + photos.length) % photos.length);

  return (
    <>
      <section className="hero">
        <div className="hero-intro">
          <div className="hero-kicker">About me · Based in Ithaca and New York</div>
          <h1>Hi, my name<br />is <span>Sydney.</span></h1>
          <p>
            I&apos;m a junior at Cornell studying Information Science, concentrating in Networks,
            Crowds, and Markets. I sit between product, sales, and data—most recently building
            outreach automation at IBM and leading a Hack4Impact team building software for nonprofits.
          </p>
          <div className="social-links" aria-label="Social links">
            <a href="https://www.linkedin.com/in/sydney-chin/" target="_blank" rel="noreferrer">LinkedIn <Arrow /></a>
            <a href="https://github.com/nysdey" target="_blank" rel="noreferrer">GitHub <Arrow /></a>
            <a href="mailto:scc273@cornell.edu">Email <Arrow /></a>
          </div>
          <dl className="quick-facts">
            <div>
              <dt>Education</dt>
              <dd>Cornell University · B.A. Information Science, Networks, Crowds &amp; Markets · Dec 2027</dd>
            </div>
            <div>
              <dt>Now</dt>
              <dd>IBM Campus Ambassador · Technical Product Manager at Cornell Hack4Impact</dd>
            </div>
            <div>
              <dt>Focus</dt>
              <dd>Technical product management · Sales engineering · Data analysis</dd>
            </div>
            <div>
              <dt>Interests</dt>
              <dd>Coffee · Music · Writing · Travel</dd>
            </div>
          </dl>
        </div>
        <div className="photo-carousel" aria-roledescription="carousel" aria-label="Photos of Sydney"
          onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
          <div className="photo-frame">
            {photos.map((item, index) => (
              <img
                key={item.src}
                src={item.src}
                alt={item.alt}
                aria-hidden={index !== photo}
                className={index === photo ? "carousel-photo active" : "carousel-photo"}
              />
            ))}
          </div>
          <div className="carousel-controls">
            <span>{photo + 1} / {photos.length}</span>
            <div>
              <button className="rotation-button" onClick={() => setPlaying((current) => !current)} aria-label={playing ? "Pause photo rotation" : "Start photo rotation"}>{playing ? "Pause" : "Play"}</button>
              <button onClick={() => showPhoto(photo - 1)} aria-label="Previous photo">←</button>
              <button onClick={() => showPhoto(photo + 1)} aria-label="Next photo">→</button>
            </div>
          </div>
        </div>
      </section>

      <section className="experience-section">
        <h2 className="section-label">Experience</h2>
        <div className="timeline">
          {timeline.map((item) => (
            <article className="timeline-item" key={item.date + item.title}>
              <time>{item.date}</time>
              <div>
                <h2>{item.title}</h2>
                <small>{item.org}</small>
                <p>{item.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="toolkit-section">
        <h2 className="section-label">Toolkit</h2>
        <dl className="toolkit-grid">
          {skillGroups.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  );
}

function Collection({ tab }: { tab: Exclude<Tab, "About Me"> }) {
  const meta = tabMeta[tab];
  return (
    <>
      <section className="collection-hero">
        <div>
          <div className="hero-kicker">{meta.eyebrow}</div>
          <h1>{meta.title.split("\n").map((line) => <span key={line}>{line}<br /></span>)}</h1>
        </div>
        <p>{meta.intro}</p>
      </section>
      {tab === "Projects" && <Projects />}
      {tab === "Music" && <Music />}
    </>
  );
}

function Projects() {
  return <section className="project-list">
    {projectCards.map((project) => (
      <article className="project-card" key={project.title}>
        <div className="project-info">
          <small>{project.type}</small>
          <h2>{project.title}</h2>
          <p>{project.copy}</p>
          <ul className="project-tags">
            {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
          </ul>
          <div className="project-links">
            {project.links.map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
                {link.label} <Arrow />
              </a>
            ))}
          </div>
        </div>
      </article>
    ))}
  </section>;
}

function Music() {
  return <section className="music-layout">
    <div className="track-list">
      {tracks.map(([number, title, artist, time]) => <article key={title}><span>{number}</span><div><h3>{title}</h3><small>{artist}</small></div><time>{time}</time><button aria-label={`Play ${title}`}>▶</button></article>)}
    </div>
  </section>;
}
