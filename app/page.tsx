"use client";

import { useEffect, useState } from "react";

const tabs = ["About Me", "Projects", "Music", "Resume"] as const;
type Tab = (typeof tabs)[number];

const tabMeta: Record<Exclude<Tab, "About Me" | "Resume">, { eyebrow: string; title: string; intro: string }> = {
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
    title: "Mavuno",
    type: "In Progress · Cornell Hack4Impact",
    copy: "An AI-powered platform helping families in Congo maintain their crops after volunteer farmers leave. I’m leading the product work with a team of designers and developers.",
    tags: ["Product Management", "Social Impact"],
    links: [],
  },
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
    copy: "B.A. in Information Science. GPA 3.5. Coursework in business intelligence systems, object-oriented programming and data structures, data science in Python, probability and statistics, econometrics, and information ethics, law, and policy.",
  },
];

// Semester summaries use the documented role dates above; ongoing research spans 2024–2025.
const chapters = [
  { term: "Freshman Fall", season: "Fall 2024", period: "Semester 1", title: "Starting at Cornell", story: "I started studying Information Science at Cornell and joined the Phonetics Lab, working with speech and transcript data.", roles: [6, 5] },
  { term: "Freshman Spring", season: "Spring 2025", period: "Semester 2", title: "Joining Hack4Impact as a Developer", story: "I joined Hack4Impact as a developer while continuing my research at the Cornell Phonetics Lab.", roles: [5] },
  { term: "Study Abroad in Taiwan", season: "Summer 2025", period: "Summer", title: "Study Abroad in Taiwan", story: "I spent the summer studying abroad in Taiwan.", roles: [] },
  { term: "Sophomore Fall", season: "Fall 2025", period: "Semester 3", title: "Exploring Data and Community Health", story: "Alongside my final semester in the lab, I analyzed how community and environmental factors relate to county-level health outcomes. That winter, I began working on engagement and acquisition at Timing.", roles: [5, 4] },
  { term: "Sophomore Spring", season: "Spring 2026", period: "Semester 4", title: "Building With Nonprofits", story: "At Hack4Impact, I moved into product strategy and development: talking with nonprofit partners and building tools for endowment and textile inventory management.", roles: [4, 3] },
  { term: "Sales Engineering at IBM in Atlanta, Georgia", season: "Summer 2026", period: "Summer", title: "Sales Engineering at IBM", story: "At IBM, I worked directly with sellers, built outreach tools, and gave live demos. I also began leading a Hack4Impact team as a technical product manager.", roles: [2, 1] },
  { term: "Junior Fall", season: "Fall 2026 · Now", period: "Semester 5 · Now", title: "Leading Products and Teaching", story: "I’m leading Mavuno at Hack4Impact and working as a teaching assistant for INFO 2850 at Cornell.", roles: [1, 0] },
];

const skillGroups = [
  ["Programming & Web", "Python · Java · JavaScript · TypeScript · R · SQL"],
  ["Frameworks", "React · Next.js · Express · Flask · HTML/CSS"],
  ["Data & Analysis", "Pandas · NumPy · SciPy · Scikit-learn · Statsmodels · Matplotlib · Plotly"],
  ["Tools & Platforms", "PostgreSQL · Firebase · Git · Figma · watsonx · Salesforce · Salesloft"],
  ["Product", "PRDs & SDDs · Roadmapping · Agile sprints · Client discovery · User research"],
];

const techIcons: Record<string, string> = {
  Python: "python", React: "react", TypeScript: "typescript", JavaScript: "javascript",
  PostgreSQL: "postgresql", Figma: "figma", Git: "git", NumPy: "numpy",
};

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
  const selectTab = (tab: Tab) => {
    setActive(tab);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main>
      <header className="site-header">
        <button className="wordmark" onClick={() => selectTab("About Me")} aria-label="Sydney Chin — About Me">
          <span className="name">Sydney Chin</span>
        </button>
        <nav className="nav" aria-label="Primary navigation">
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
      </header>

      <div className="page-shell" key={active}>
        {active === "About Me" ? <About /> : active === "Resume" ? <Resume /> : <Collection tab={active} />}
      </div>

      <footer>
        <span>© 2026 Sydney Chin</span>
        <span className="footer-center">Sleepy Hollow, NY</span>
      </footer>
    </main>
  );
}

function About() {
  const photos = [
    { src: "/media/sydney-with-bob.jpg", caption: "Summer 2026 - IBM Bob Event", alt: "Sydney holding a Bob cutout at the IBMer watsonx Challenge", position: "left top", zoom: 1.16 },
    { src: "/media/sydney-headshot.jpg", caption: "Spring 2025 - Headshot", alt: "Sydney in a black blazer in a sunlit hallway", position: "center 58%", zoom: 1.22 },
    { src: "/media/curvy-tree.jpg", caption: "Spring 2026 - Funny tree outside my dorm", alt: "Sydney standing beside a curved evergreen tree on campus", position: "right center", zoom: 1.11 },
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
          <h1>Hi, I&apos;m <span className="name-accent">Sydney.</span></h1>
          <p>
            I&apos;m a junior at Cornell majoring in information science. I&apos;m interested in enterprise technology, solutions architecture, product strategy, and client-facing sales engineering.
          </p>
          <dl className="quick-facts">
            <div>
              <dt>Education</dt>
              <dd><ul><li>Cornell University · B.A. Information Science</li><li>August 2024 – December 2027</li></ul></dd>
            </div>
            <div>
              <dt>Now</dt>
              <dd><ul><li>Technical Product Manager @ Cornell Hack4Impact</li><li>Teaching Assistant for INFO 2850 @ Cornell Bowers College of Computing and Information Science</li></ul></dd>
            </div>
            <div>
              <dt>Previously</dt>
              <dd><ul><li>Sales Engineer Intern @ IBM</li><li>Developer @ Cornell Hack4Impact</li><li>Research Assistant @ Cornell Phonetics Lab</li></ul></dd>
            </div>
          </dl>
          <div className="social-links" aria-label="Social links">
            <a href="https://www.linkedin.com/in/sydney-chin/" target="_blank" rel="noreferrer" aria-label="LinkedIn" title="LinkedIn"><span className="linkedin-mark" aria-hidden="true">in</span></a>
            <a href="https://github.com/nysdey" target="_blank" rel="noreferrer" aria-label="GitHub" title="GitHub"><img src="/icons/github.svg" alt="" width="22" height="22" /></a>
            <a href="mailto:scc273@cornell.edu" aria-label="Email Sydney" title="Email"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 6 9 7 9-7" /></svg></a>
          </div>
        </div>
        <div className="photo-carousel" aria-roledescription="carousel" aria-label="Photos of Sydney"
          onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
          onFocusCapture={() => setPlaying(false)}>
          <div className="photo-frame" tabIndex={0} aria-label={photos[photo].caption}>
            {photos.map((item, index) => (
              <img
                key={item.src}
                src={item.src}
                alt={item.alt}
                style={{ objectPosition: item.position, transform: `scale(${item.zoom ?? 1})`, transformOrigin: item.position }}
                aria-hidden={index !== photo}
                className={index === photo ? "carousel-photo active" : "carousel-photo"}
              />
            ))}
            <div className="photo-caption" aria-hidden="true">{photos[photo].caption}</div>
          </div>
          <div className="carousel-controls">
            <div className="carousel-dots" role="group" aria-label="Choose a photo">
              {photos.map((item, index) => (
                <button key={item.src} className={index === photo ? "carousel-dot active" : "carousel-dot"}
                  onClick={() => showPhoto(index)} aria-label={`Show photo ${index + 1}`}
                  aria-pressed={index === photo} />
              ))}
            </div>
            <div>
              <button onClick={() => showPhoto(photo - 1)} aria-label="Previous photo">←</button>
              <button onClick={() => showPhoto(photo + 1)} aria-label="Next photo">→</button>
            </div>
          </div>
        </div>
      </section>

      <section className="experience-section">
        <h2 className="section-label">Timeline</h2>
        <ol className="story-timeline">
          {chapters.map((chapter) => (
            <li className="story-chapter" key={chapter.term}>
              <h3 className="story-date"><span className="story-season">{chapter.season.replace(" · Now", "")}</span><span className="story-divider" aria-hidden="true">|</span><span>{chapter.period}</span></h3>
              <h4 className="story-title">{chapter.title}</h4>
              <p>{chapter.story}</p>
              <details>
                <summary aria-label={`Details for ${chapter.term}`}><span aria-hidden="true">+</span></summary>
                <div className="chapter-details">
                  {chapter.roles.length === 0 && <p>Study Abroad · Taiwan · Summer 2025</p>}
                  {chapter.roles.map((index) => (
                    <article key={timeline[index].title}>
                      <h4>{timeline[index].title}</h4>
                      <small>{timeline[index].org} · {timeline[index].date}</small>
                      <p>{timeline[index].copy}</p>
                    </article>
                  ))}
                </div>
              </details>
            </li>
          ))}
        </ol>
      </section>

      <section className="toolkit-section">
        <h2 className="section-label">Skills</h2>
        <div className="tech-grid">
          {skillGroups.map(([label, value]) => (
            <section className="tech-group" key={label} aria-label={label}>
              <h3>{label}</h3>
              <ul>
                {value.split(" · ").map((name) => (
                  <li key={name}>
                    {techIcons[name] ? <img src={`/icons/${techIcons[name]}.svg`} alt="" width="20" height="20" loading="lazy" /> : <span className="tech-monogram" aria-hidden="true">{name === "SQL" ? "DB" : name.slice(0, 2)}</span>}
                    <span>{name}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </section>
    </>
  );
}

function Collection({ tab }: { tab: Exclude<Tab, "About Me" | "Resume"> }) {
  if (tab === "Projects") return <Projects />;
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
      {tab === "Music" && <Music />}
    </>
  );
}

function Projects() {
  return <section className="project-list" aria-label="Projects">
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
        {project.title === "Mavuno" ? <MavunoCarousel /> : <div className="project-media" aria-label={`Images for ${project.title} coming soon`}><span>Project images coming soon</span></div>}
      </article>
    ))}
  </section>;
}

function Music() {
  return <section className="music-layout">
    <div className="track-list">
      {tracks.map(([number, title, artist, time]) => <article key={title}><span>{number}</span><div><h3>{title}</h3><small>{artist}</small></div><time>{time}</time></article>)}
    </div>
  </section>;
}

function Resume() {
  return <section className="resume-page" aria-label="Resume">
    <div className="resume-placeholder">
      <h1>Resume</h1>
      <p>PDF coming soon.</p>
    </div>
  </section>;
}

const mavunoSlides = [
  "Mavuno project overview — Hack4Impact, Fall 2026",
  "What is Mavuno? Farmer, agronomist, and staff workflows",
  "Mavuno architecture — mobile app, admin dashboard, backend, and AI",
  "Mavuno development subprojects and their connections",
];

function MavunoCarousel() {
  const [slide, setSlide] = useState(0);
  const navigate = (next: number) => setSlide((next + mavunoSlides.length) % mavunoSlides.length);
  return <div className="project-carousel" role="region" aria-roledescription="carousel" aria-label="Mavuno project slides"
    onKeyDown={(event) => {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
        navigate(slide + (event.key === "ArrowRight" ? 1 : -1));
      }
    }}>
    <div className="project-slide-frame">
      {mavunoSlides.map((alt, index) => <img key={alt} src={`/media/mavuno-${index + 1}.png`} alt={alt}
        className={index === slide ? "project-slide active" : "project-slide"} aria-hidden={index !== slide} />)}
    </div>
    <div className="carousel-controls">
      <div className="carousel-dots" role="group" aria-label="Choose a Mavuno slide">
        {mavunoSlides.map((alt, index) => <button key={alt} className={index === slide ? "carousel-dot active" : "carousel-dot"}
          aria-label={`Show slide ${index + 1}: ${alt}`} aria-pressed={index === slide} onClick={() => navigate(index)} />)}
      </div>
      <div>
        <button onClick={() => navigate(slide - 1)} aria-label="Previous Mavuno slide">←</button>
        <button onClick={() => navigate(slide + 1)} aria-label="Next Mavuno slide">→</button>
      </div>
    </div>
    <span className="sr-only" aria-live="polite">Slide {slide + 1} of {mavunoSlides.length}: {mavunoSlides[slide]}</span>
  </div>;
}
