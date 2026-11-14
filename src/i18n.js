import { createContext, useContext } from "react";

export const LANGS = ["hr", "en"];

export const LangContext = createContext({ lang: "hr", setLang: () => {} });

/** Vraća tekst na aktivnom jeziku: t({hr, en}) ili običan string. */
export function useT() {
  const { lang } = useContext(LangContext);
  const t = (v) => (v && typeof v === "object" && !Array.isArray(v) ? v[lang] ?? v.hr : v);
  t.lang = lang;
  t.ui = (key) => UI[key]?.[lang] ?? key;
  return t;
}

export function initialLang() {
  try {
    const saved = window.localStorage.getItem("lang");
    if (LANGS.includes(saved)) return saved;
  } catch (e) {
    /* localStorage nije dostupan */
  }
  const nav = (navigator.language || "hr").toLowerCase();
  return nav.startsWith("hr") || nav.startsWith("bs") || nav.startsWith("sr") ? "hr" : "en";
}

// Tekstovi sučelja (izbornik, gumbi, naslovi sekcija)
export const UI = {
  navServices: { hr: "Što radim", en: "Services" },
  navWork: { hr: "Radovi", en: "Work" },
  navAbout: { hr: "O meni", en: "About" },
  navPhoto: { hr: "Fotografija", en: "Photography" },
  navExperience: { hr: "Iskustvo", en: "Experience" },
  navContact: { hr: "Kontakt", en: "Contact" },
  menu: { hr: "Izbornik", en: "Menu" },
  seeWork: { hr: "Pogledaj radove", en: "See my work" },

  workTitle: { hr: "Radovi", en: "Work" },
  workText: {
    hr: "Projekti podijeljeni po vrsti posla. Otvori projekt za slike i detalje.",
    en: "Projects grouped by type of work. Open a project for images and details.",
  },
  includes: { hr: "Obuhvaća", en: "Includes" },
  kind_work: { hr: "Posao", en: "Work" },
  kind_client: { hr: "Za klijenta", en: "Client" },
  kind_personal: { hr: "Osobni projekt", en: "Personal" },
  kind_edu: { hr: "Edukacija", en: "Course project" },
  visitSite: { hr: "Otvori stranicu", en: "Visit site" },
  projectAbout: { hr: "O projektu", en: "About the project" },
  exPlay: { hr: "Pokreni automatsku šetnju", en: "Start auto-walk" },
  exPause: { hr: "Zaustavi", en: "Pause" },
  exAuto: { hr: "Fotografije kruže same — povuci, dodirni sliku ili strelicu za zaustavljanje", en: "The photos turn on their own — drag, tap a picture or an arrow to stop" },
  servicesTitle: { hr: "Što radim", en: "What I do" },
  servicesText: {
    hr: "Od prve skice do datoteke spremne za tiskaru ili web — znam voditi posao kroz cijeli proces.",
    en: "From the first sketch to a file ready for print or web — I can take work through the whole process.",
  },

  featuredTitle: { hr: "Izdvojeni radovi", en: "Selected work" },
  featuredText: {
    hr: "Nekoliko projekata koji najbolje pokazuju kako radim — od prijeloma do ambalaže.",
    en: "A few projects that best show how I work — from layout to packaging.",
  },
  tools: { hr: "Alati", en: "Tools" },
  viewProject: { hr: "Pogledaj projekt", en: "View project" },
  images: { hr: "slike", en: "images" },

  moreTitle: { hr: "Još radova", en: "More work" },
  moreText: { hr: "Identiteti, ilustracija i digitalni materijali.", en: "Identities, illustration and digital assets." },
  view: { hr: "Pogledaj", en: "View" },
  webTitle: { hr: "Web projekti", en: "Web projects" },
  behanceAll: { hr: "Cijeli portfolio", en: "Full portfolio" },
  behanceAllText: { hr: "Svi projekti i detalji na jednom mjestu.", en: "All projects and details in one place." },

  aboutTitle: { hr: "O meni", en: "About me" },

  photoTitle: { hr: "Fotografija", en: "Photography" },
  photoText: {
    hr: "Putovanja, svjetlo i trenuci koje vrijedi zadržati. Fotografiram iz ljubavi — a to se prelijeva i u produktnu fotografiju na poslu.",
    en: "Travel, light and moments worth keeping. I photograph for the love of it — and it carries over into product photography at work.",
  },
  exhibitionEyebrow: { hr: "Virtualna izložba", en: "Virtual exhibition" },
  exhibitionTitle: { hr: "Prošeći mojom galerijom", en: "Take a walk through my gallery" },
  exhibitionText: {
    hr: "Fotografije obješene u krug, svaka pod svojim svjetlom. Krug se polako okreće sam — povuci ga, zaustavi ili otvori sliku preko cijelog ekrana.",
    en: "Photographs hung in a circle, each under its own light. The circle turns slowly on its own — drag it, stop it or open a picture full screen.",
  },
  enterExhibition: { hr: "Uđi na izložbu", en: "Enter the exhibition" },
  showAll: { hr: "Prikaži sve fotografije", en: "Show all photographs" },
  showLess: { hr: "Prikaži manje", en: "Show less" },

  expTitle: { hr: "Iskustvo i znanja", en: "Experience & skills" },
  expWork: { hr: "Radno iskustvo", en: "Work experience" },
  expEdu: { hr: "Obrazovanje", en: "Education" },
  expSkills: { hr: "Alati i vještine", en: "Tools & skills" },
  now: { hr: "Sada", en: "Now" },

  contactEyebrow: { hr: "Kontakt", en: "Contact" },
  contactTitle: { hr: "Imaš projekt ili otvorenu poziciju?", en: "Have a project or an open position?" },
  contactSub: { hr: "Javi se, rado ću poslušati.", en: "Get in touch — I'd love to hear about it." },
  copyEmail: { hr: "Kopiraj e-mail", en: "Copy email" },
  copied: { hr: "Kopirano ✓", en: "Copied ✓" },
  backTop: { hr: "Natrag na vrh ↑", en: "Back to top ↑" },

  close: { hr: "Zatvori", en: "Close" },
  prev: { hr: "Prethodna", en: "Previous" },
  next: { hr: "Sljedeća", en: "Next" },
  open: { hr: "Otvori", en: "Open" },

  exExit: { hr: "Izađi s izložbe", en: "Leave the exhibition" },
  exTitle: { hr: "Svjetlo i mjesta", en: "Light and Places" },
  exSubtitle: { hr: "Izbor fotografija", en: "Selected photographs" },
  exIntro: {
    hr: "Fotografije nastale na putovanjima i u svakodnevici. Šetnja kreće sama; dodirom na sliku ili strelicu je zaustavljaš, a zaustavljenu sliku klikom uvećavaš.",
    en: "Photographs taken while travelling and in everyday life. The walk starts on its own; tap a picture or an arrow to stop it, then click a picture to enlarge it.",
  },
  exStart: { hr: "Kreni →", en: "Start →" },
  exMedium: { hr: "Fotografija, digitalni ispis", en: "Photograph, digital print" },
  exEndTitle: { hr: "Hvala na posjetu", en: "Thank you for visiting" },
  exEndText: { hr: "Još fotografija nalazi se na mom Instagramu.", en: "You can find more photographs on my Instagram." },
  exBack: { hr: "← Na početak", en: "← Back to start" },
  exHint: { hr: "Povuci, koristi strelice ili kotačić · klik na sliku sprijeda je otvara", en: "Drag, use the arrows or the wheel · click the front picture to open it" },
};
