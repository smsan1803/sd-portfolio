import { useState, useEffect, useContext } from "react";
import {
  person,
  hero,
  services,
  workGroups,
  about,
  photos,
  experience,
  education,
  skills,
} from "./data";
import { LangContext, LANGS, initialLang, useT } from "./i18n";
import Img from "./components/Img";
import Lightbox from "./components/Lightbox";
import Exhibition from "./components/Exhibition";
import ProjectModal from "./components/ProjectModal";
import useReveal from "./components/useReveal";
import KindBadge from "./components/KindBadge";

const NAV = [
  { id: "sto-radim", key: "navServices" },
  { id: "fotografija", key: "navPhoto" },
  { id: "radovi", key: "navWork" },
  { id: "o-meni", key: "navAbout" },
  { id: "iskustvo", key: "navExperience" },
];

/* ---------------------------------- Jezik ---------------------------------- */
function LangSwitch() {
  const { lang, setLang } = useContext(LangContext);
  return (
    <div className="lang" role="group" aria-label="Language">
      {LANGS.map((l) => (
        <button key={l} className={lang === l ? "is-active" : ""} onClick={() => setLang(l)} aria-pressed={lang === l}>
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

/* ---------------------------------- Navigacija ---------------------------------- */
function Header() {
  const t = useT();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? "is-scrolled" : ""} ${open ? "is-open" : ""}`}>
      <div className="container header__row">
        <a href="#top" className="logo" onClick={() => setOpen(false)}>
          <span className="logo__mark">sd</span>
          <span className="logo__name">{person.name}</span>
        </a>
        <nav className="nav" aria-label="Navigation">
          {NAV.map((n) => (
            <a key={n.id} href={`#${n.id}`} onClick={() => setOpen(false)}>
              {t.ui(n.key)}
            </a>
          ))}
          <a href="#kontakt" className="btn btn--small" onClick={() => setOpen(false)}>
            {t.ui("navContact")}
          </a>
        </nav>
        <div className="header__right">
          <LangSwitch />
          <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label={t.ui("menu")} aria-expanded={open}>
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}

/* ---------------------------------- Hero ---------------------------------- */
/* Riječi u naslovu koje se mekano izmjenjuju (sve su složene u istu ćeliju pa se ništa ne pomiče) */
function RotatingWords({ words }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    setI(0);
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return undefined;
    const id = setInterval(() => setI((n) => (n + 1) % words.length), 2600);
    return () => clearInterval(id);
  }, [words]);
  return (
    <>
      <span className="rotator" aria-hidden="true">
        {words.map((w, k) => (
          <em key={w} className={k === i ? "is-on" : k === (i - 1 + words.length) % words.length ? "is-out" : ""}>
            {w}
          </em>
        ))}
      </span>
      <span className="sr-only">{words.join(", ")} </span>
    </>
  );
}

function Hero() {
  const t = useT();
  const roles = t(person.roles);
  return (
    <section className="hero" id="top">
      <div className="container hero__grid">
        <div className="hero__text">
          <p className="hero__status reveal">
            <span className="dot" /> {t(person.available)} · {t(person.location)}
          </p>
          <h1 className="hero__title reveal">
            {t(hero.greeting)}
            <br />
            {t(hero.titleA)}
            <RotatingWords words={t(hero.titleWords)} />
            {t(hero.titleB)}
          </h1>
          <p className="hero__lead reveal">{t(hero.lead)}</p>
          <div className="hero__actions reveal">
            <a href="#radovi" className="btn">
              {t.ui("seeWork")}
            </a>
            <a href={`mailto:${person.email}`} className="btn btn--ghost">
              {person.email}
            </a>
          </div>
        </div>

        <div className="hero__visual reveal">
          <div className="hero__photo">
            <Img src={person.photo} alt={person.name} />
          </div>
        </div>
      </div>

      <div className="ticker" aria-hidden="true">
        <div className="ticker__track">
          {[0, 1].map((k) => (
            <div className="ticker__group" key={k}>
              {roles.concat(roles).map((r, i) => (
                <span key={i}>
                  {r} <i>✦</i>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- Naslov sekcije ---------------------------------- */
function SectionHead({ index, title, text, children, light }) {
  return (
    <div className={`section-head reveal ${light ? "section-head--light" : ""}`}>
      <div>
        <span className="section-head__index">{index}</span>
        <h2>{title}</h2>
      </div>
      {text && <p>{text}</p>}
      {children}
    </div>
  );
}

/* ---------------------------------- Što radim ---------------------------------- */
function Services() {
  const t = useT();
  return (
    <section className="section" id="sto-radim">
      <div className="container">
        <SectionHead index="01" title={t.ui("servicesTitle")} text={t.ui("servicesText")} />
        <div className="services">
          {services.map((s, i) => (
            <div className="service reveal" key={i}>
              <span className="service__no">{String(i + 1).padStart(2, "0")}</span>
              <h3>{t(s.title)}</h3>
              <p>{t(s.text)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- Radovi ---------------------------------- */
function Work({ onOpenProject }) {
  const t = useT();
  return (
    <section className="section section--work" id="radovi">
      <div className="container">
        <SectionHead index="03" title={t.ui("workTitle")} text={t.ui("workText")} />

        <div className="groups">
          {workGroups.map((g, gi) => (
            <div className="group" key={g.id} id={`radovi-${g.id}`}>
              <div className="group__head reveal">
                <span className="group__index">{String(gi + 1).padStart(2, "0")}</span>
                <h3>{t(g.title)}</h3>
                <p>{t(g.text)}</p>
              </div>
              <div className="group__grid">
                {g.projects.map((p) => {
                  const external = !!p.href;
                  const Tag = external ? "a" : "button";
                  const props = external
                    ? { href: p.href, target: "_blank", rel: "noreferrer" }
                    : { onClick: () => onOpenProject(p, g), type: "button" };
                  return (
                    <Tag className={`tile reveal ${p.thumb ? "" : "tile--text"}`} key={p.id} {...props}>
                      {p.thumb ? (
                        <span className="tile__media">
                          <Img src={p.thumb} alt="" />
                        </span>
                      ) : (
                        <span className="tile__icon" aria-hidden="true">
                          {p.icon}
                        </span>
                      )}
                      <span className="tile__body">
                        <KindBadge kind={p.kind} />
                        <span className="tile__title">{t(p.title)}</span>
                        <span className="tile__scope">{t(p.scope).join(" · ")}</span>
                        {!p.thumb && <span className="tile__text">{t(p.text)}</span>}
                        <span className="tile__cta">
                          {external ? t.ui("visitSite") : t.ui("viewProject")} <span aria-hidden="true">{external ? "↗" : "→"}</span>
                        </span>
                      </span>
                    </Tag>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- O meni ---------------------------------- */
function About() {
  const t = useT();
  return (
    <section className="section section--tint" id="o-meni">
      <div className="container about">
        <SectionHead index="04" title={t.ui("aboutTitle")} />
        <div className="about__grid">
          <p className="about__lead reveal">{t(about.lead)}</p>
          <div className="about__body">
            {about.paragraphs.map((p, i) => (
              <p className="reveal" key={i}>
                {t(p)}
              </p>
            ))}
          </div>
        </div>
        <div className="facts">
          {about.facts.map((f) => (
            <div className="fact reveal" key={f.value}>
              <strong>{f.value}</strong>
              <span>{t(f.label)}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- Fotografija ---------------------------------- */
function Gallery({ onEnter }) {
  const t = useT();
  const insta = person.links.find((l) => l.label === "Instagram");
  const preview = photos.slice(0, 10);

  return (
    <section className="section" id="fotografija">
      <div className="container">
        <SectionHead index="02" title={t.ui("photoTitle")} text={t.ui("photoText")}>
          {insta && (
            <a href={insta.href} target="_blank" rel="noreferrer" className="text-link">
              @dsphotosd <span aria-hidden="true">↗</span>
            </a>
          )}
        </SectionHead>

        <div className="expo-cta reveal">
          <div className="expo-cta__text">
            <span className="eyebrow">{t.ui("exhibitionEyebrow")}</span>
            <h3>{t.ui("exhibitionTitle")}</h3>
            <p>{t.ui("exhibitionText")}</p>
            <button className="btn" onClick={onEnter}>
              {t.ui("enterExhibition")} <span aria-hidden="true">→</span>
            </button>
          </div>
          <button className="expo-cta__wall mini-ring" onClick={onEnter} aria-label={t.ui("enterExhibition")}>
            <span className="mini-ring__spin" style={{ "--n": preview.length }}>
              {preview.map((ph, i) => (
                <span className="mini-ring__item" key={i} style={{ "--i": i }}>
                  <span className="mini-ring__mat">
                    <Img src={ph.src} alt="" />
                  </span>
                </span>
              ))}
            </span>
            <span className="mini-ring__floor" />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- Iskustvo ---------------------------------- */
function Experience() {
  const t = useT();
  return (
    <section className="section section--tint" id="iskustvo">
      <div className="container">
        <SectionHead index="05" title={t.ui("expTitle")} />
        <div className="exp-grid">
          <div>
            <h3 className="col-title reveal">{t.ui("expWork")}</h3>
            <ol className="timeline">
              {experience.map((e, i) => (
                <li className="reveal" key={i}>
                  <div className="timeline__head">
                    <h4>{t(e.role)}</h4>
                    {e.current && <span className="badge">{t.ui("now")}</span>}
                  </div>
                  <span className="timeline__place">{t(e.place)}</span>
                  <p>{t(e.text)}</p>
                </li>
              ))}
            </ol>

            <h3 className="col-title reveal">{t.ui("expEdu")}</h3>
            <ul className="edu">
              {education.map((e, i) => (
                <li className="reveal" key={i}>
                  <strong>{t(e.title)}</strong>
                  <span>{t(e.place)}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="col-title reveal">{t.ui("expSkills")}</h3>
            <div className="skills">
              {skills.map((s, i) => (
                <div className="skill reveal" key={i}>
                  <span className="skill__group">{t(s.group)}</span>
                  <ul className="chips">
                    {s.items.map((it, j) => (
                      <li key={j}>{t(it)}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- Kontakt ---------------------------------- */
function Contact() {
  const t = useT();
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(person.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (e) {
      window.location.href = `mailto:${person.email}`;
    }
  };

  return (
    <section className="contact" id="kontakt">
      <div className="container">
        <span className="eyebrow eyebrow--light reveal">06 — {t.ui("contactEyebrow")}</span>
        <h2 className="contact__title reveal">
          {t.ui("contactTitle")}
          <br />
          <span>{t.ui("contactSub")}</span>
        </h2>
        <div className="contact__row reveal">
          <a href={`mailto:${person.email}`} className="contact__email">
            {person.email}
          </a>
          <button onClick={copy} className="btn btn--light btn--small">
            {copied ? t.ui("copied") : t.ui("copyEmail")}
          </button>
        </div>
        <div className="contact__links reveal">
          <a href={person.phoneHref}>{person.phone}</a>
          {person.links.map((l) => (
            <a key={l.label} href={l.href} target="_blank" rel="noreferrer">
              {l.label} ↗
            </a>
          ))}
        </div>
      </div>
      <footer className="container footer">
        <span>
          © {new Date().getFullYear()} {person.name}
        </span>
        <span>{t(person.location)}</span>
        <a href="#top">{t.ui("backTop")}</a>
      </footer>
    </section>
  );
}

/* ---------------------------------- Stranica ---------------------------------- */
function Page() {
  const t = useT();
  const [box, setBox] = useState(null); // lightbox: { items, index }
  const [project, setProject] = useState(null); // { project, group }
  const [expo, setExpo] = useState(false);
  useReveal([t.lang]);

  const openImage = (p, i) =>
    setBox({
      items: p.images.map((im) => ({ src: im.src, full: im.full, alt: t(p.title) })),
      index: i,
    });

  const openPhoto = (i) =>
    setBox({
      items: photos.map((ph) => ({ src: ph.src, full: ph.full, alt: ph.alt, caption: `No. ${ph.no}` })),
      index: i,
    });

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <Gallery onEnter={() => setExpo(true)} />
        <Work onOpenProject={(p, g) => setProject({ project: p, group: g })} />
        <About />
        <Experience />
        <Contact />
      </main>
      {project && (
        <ProjectModal
          project={project.project}
          group={project.group}
          onClose={() => setProject(null)}
          onOpenImage={(i) => openImage(project.project, i)}
          paused={!!box}
        />
      )}
      {expo && <Exhibition photos={photos} onClose={() => setExpo(false)} onOpenPhoto={openPhoto} paused={!!box} />}
      {box && <Lightbox {...box} onClose={() => setBox(null)} onChange={(index) => setBox((b) => ({ ...b, index }))} />}
    </>
  );
}

export default function App() {
  const [lang, setLangState] = useState(initialLang);

  const setLang = (l) => {
    setLangState(l);
    try {
      window.localStorage.setItem("lang", l);
    } catch (e) {
      /* ignore */
    }
  };

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title =
      lang === "hr"
        ? "Sandra Doblanović — Grafički dizajn & fotografija"
        : "Sandra Doblanović — Graphic Design & Photography";
  }, [lang]);

  const value = { lang, setLang };

  return (
    <LangContext.Provider value={value}>
      <Page />
    </LangContext.Provider>
  );
}
