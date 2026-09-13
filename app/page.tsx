"use client";

import { useEffect, useState } from "react";

const tabs = ["About Me", "Projects", "Resume"] as const;
type Tab = (typeof tabs)[number] | "Music";

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
    "date": "Summer 2026",
    "title": "IBM campus ambassador selection",
    "org": "IBM",
    "copy": "Selected as a campus ambassador and invited to speak at the IBM US College & University Tech Talk following my internship."
  },
  {
    "date": "May 2026 — Present",
    "title": "Product manager / technical lead — Mavuno",
    "org": "Cornell Hack4Impact · Ithaca, NY",
    "copy": "Lead four developers and two designers building a mobile and web platform connecting farmers in the Democratic Republic of Congo with continued agricultural support. Own the PRD, SDD, and two-semester roadmap; translate literacy, connectivity, language, and cost constraints into requirements. Drive sprint planning, review technical and design work, mentor an Associate PM, and lead biweekly client meetings."
  },
  {
    "date": "May 2026 — Aug 2026",
    "title": "Technical sales solutions intern",
    "org": "IBM · Brookhaven, GA",
    "copy": "Prospected accounts across four U.S. regions for IBM hybrid cloud solutions and interviewed sellers to uncover workflow bottlenecks. Built personalized outreach tools, presented proofs of concept to Georgia leadership, and led live watsonx demonstrations. Ranked among the top five interns, with an 11.1% call-connection rate and 2.4% positive-call rate."
  },
  {
    "date": "Feb 2025 — May 2026",
    "title": "Full-stack developer",
    "org": "Cornell Hack4Impact · Ithaca, NY",
    "copy": "Developed an endowment manager for small organizations and an inventory system for the Hudson Valley Textile Project. Implemented weekly engineering tickets across Agile sprints, explored nonprofit partners’ technical needs, and helped organizations adopt and customize Hack4Impact products."
  },
  {
    "date": "Dec 2025 — Feb 2026",
    "title": "Business analyst intern",
    "org": "Timing LLC · Remote",
    "copy": "Built weekly active user models and surveys to assess engagement, developed ideal customer profiles and a campus acquisition strategy, and wrote newsletters."
  },
  {
    "date": "Aug 2024 — Dec 2025",
    "title": "Research assistant",
    "org": "Cornell Phonetics Lab · Ithaca, NY",
    "copy": "Analyzed speech and transcript data using Python, NumPy, SciPy, and Matplotlib. Built a TextGrid workflow and mentored seven research assistants."
  },
  {
    "date": "Aug 2024 — Dec 2027 (Expected)",
    "title": "B.A. in Information Science",
    "org": "Cornell University · Ithaca, NY",
    "copy": "Studying Information Science at Cornell Bowers, with coursework in data structures, data science, probability and statistics, networks, economics, and information ethics."
  },
  {
    "date": "Aug 2026 — Present",
    "title": "Teaching assistant — INFO 2850: Networks",
    "org": "Cornell University · Ithaca, NY",
    "copy": "Lead weekly office hours for a course of more than 300 students covering network analysis, game theory, markets, and strategic interaction. Grade coursework and support students through the course forum."
  },
  {
    "date": "Feb 2025 — May 2025",
    "title": "Volunteer instructor — advanced coding class",
    "org": "Girls Who Code · Ithaca, NY",
    "copy": "Taught middle and high school students HTML, CSS, and game development in weekly 1.5-hour classes."
  },
  {
    "date": "Fall 2025",
    "title": "County-level health & community factors analysis",
    "org": "Data Analysis Project",
    "copy": "Modeled relationships between environmental, socioeconomic, and behavioral factors and mental and physical health outcomes across U.S. counties, identifying environmental accessibility as a potential policy lever."
  }
];

// Resume-grounded chronology; Taiwan study abroad supplied separately.
const chapters = [
  {
    "term": "Freshman Fall",
    "season": "Fall 2024",
    "title": "Started freshman year at Cornell",
    "story": "I began studying Information Science and joined the Phonetics Lab, putting data analysis into practice through speech research.",
    "roles": [
      6,
      5
    ]
  },
  {
    "term": "Freshman Spring",
    "season": "Spring 2025",
    "title": "Built with Hack4Impact and taught coding",
    "story": "I joined Hack4Impact as a full-stack developer and volunteered with Girls Who Code, expanding from research into building software and helping others learn.",
    "roles": [
      3,
      8
    ]
  },
  {
    "term": "Study Abroad in Taiwan",
    "season": "Summer 2025",
    "title": "Studied abroad in Taiwan",
    "story": "I spent the summer studying abroad in Taiwan.",
    "roles": []
  },
  {
    "term": "Sophomore Fall",
    "season": "Fall 2025",
    "title": "Started sophomore year exploring data and community impact",
    "story": "I continued developing nonprofit tools at Hack4Impact, completed my time in the Phonetics Lab, and explored county-level health outcomes through a data analysis project.",
    "roles": [
      3,
      5,
      9
    ]
  },
  {
    "term": "Sophomore Spring",
    "season": "Spring 2026",
    "title": "Moved from development into product leadership",
    "story": "I worked on engagement and acquisition at Timing, continued building nonprofit software, and stepped into the product manager and technical lead role for Mavuno in May.",
    "roles": [
      4,
      3,
      1
    ]
  },
  {
    "term": "Summer at IBM",
    "season": "Summer 2026",
    "title": "Worked in sales engineering at IBM in Georgia",
    "story": "I connected technical solutions with client needs through sales outreach, internal tools, and live demonstrations at IBM, while continuing to lead Mavuno.",
    "roles": [
      2,
      0
    ]
  },
  {
    "term": "Junior Fall",
    "season": "Fall 2026 · Now",
    "title": "Starting junior year: leading Mavuno and teaching networks",
    "story": "I’m leading Mavuno’s product and technical work while helping students learn network analysis, game theory, and markets as a teaching assistant for INFO 2850.",
    "roles": [
      1,
      7
    ]
  }
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
    { src: "/media/sydney-headshot.jpg", caption: "Spring 2025 - Headshot", alt: "Sydney in a black blazer in a sunlit hallway", position: "center center", zoom: 1.32 },
    { src: "/media/sydney-with-bob.jpg", caption: "Summer 2026 - IBM Bob Event", alt: "Sydney holding a Bob cutout at the IBMer watsonx Challenge", position: "left top", zoom: 1.16 },
    { src: "/media/curvy-tree.jpg", caption: "Spring 2026 - Funny tree outside my dorm", alt: "Sydney standing beside a curved evergreen tree on campus", position: "right center", zoom: 1.11 },
  ];
  const [photo, setPhoto] = useState(0);
  const [expandedChapters, setExpandedChapters] = useState<string[]>([]);
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
              <dt>Currently</dt>
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
          {[...chapters].reverse().map((chapter) => (
            <li className="story-chapter" key={chapter.term}>
              <h3 className="story-date"><span className="story-season">{chapter.season.replace(" · Now", "")}</span></h3>
              <h4 className="story-title">{chapter.title}</h4>
              <span className={expandedChapters.includes(chapter.term) ? "timeline-marker expanded" : "timeline-marker"} aria-hidden="true" />
              <button className="timeline-toggle" aria-label={`${expandedChapters.includes(chapter.term) ? "Hide" : "Show"} details for ${chapter.term}`}
                aria-expanded={expandedChapters.includes(chapter.term)}
                onClick={() => setExpandedChapters((current) => current.includes(chapter.term) ? current.filter((term) => term !== chapter.term) : [...current, chapter.term])}>
                <span className="timeline-symbol" aria-hidden="true">{expandedChapters.includes(chapter.term) ? "−" : "+"}</span>
              </button>
              <div hidden={!expandedChapters.includes(chapter.term)}>
                <p>{chapter.story}</p>
                <div className="chapter-details">
                  {chapter.roles.length === 0 && <p>Study Abroad · Taiwan · Summer 2025</p>}
                  {chapter.roles.map((index) => (
                    <article key={timeline[index].title}>
                      <h4>{timeline[index].title}</h4>
                      <div className="role-meta"><small>{timeline[index].org}</small><small className="role-date">{timeline[index].date}</small></div>
                      <p>{timeline[index].copy}</p>
                    </article>
                  ))}
                </div>
              </div>
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
                    {techIcons[name] ? <img src={`/icons/${techIcons[name]}.svg`} alt="" width="20" height="20" loading="lazy" /> : null}
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
          <h2>{project.title}</h2>
          <small>{project.type}</small>
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
        {project.title === "Mavuno" ? <MavunoCarousel /> : project.title === "BobBee" ? <ProjectVideo videoId="FgoginwGPZo" name="BobBee" /> : project.title === "IBM Hive" ? <ProjectVideo videoId="-O5OVQGKkRs" name="IBM Hive" /> : <div className="project-media" aria-label={`Images for ${project.title} coming soon`}><span>Project images coming soon</span></div>}
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
    <a href="/Sydney_Chin_Resume.pdf" target="_blank" rel="noreferrer" aria-label="Open resume PDF"><img className="resume-page-image" src="/media/resume-page-1.png" alt="Sydney Chin resume, page 1" /></a>
    <a className="resume-download" href="/Sydney_Chin_Resume.pdf" download>Download Resume</a>
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

function ProjectVideo({ videoId, name }: { videoId: string; name: string }) {
  const [playing, setPlaying] = useState(false);
  return <div className="project-video">
    {playing ? <iframe src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`} title={`${name} project demo`} allow="autoplay; encrypted-media; picture-in-picture" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen /> :
      <button className="video-preview" onClick={() => setPlaying(true)} aria-label={`Play ${name} demo`}>
        <img src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`} alt={`${name} demo video preview`} />
        <span className="video-play" aria-hidden="true">▶</span>
        <span className="video-label">Watch {name} Demo</span>
      </button>}
  </div>;
}
