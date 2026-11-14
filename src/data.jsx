// ------------------------------------------------------------
//  SVI SADRŽAJI STRANICE NALAZE SE OVDJE.
//  Tekstovi su dvojezični: { hr: "...", en: "..." }.
//  Slike stavljaš u /public/img/... i navodiš ih putem img("mapa/naziv.jpg").
// ------------------------------------------------------------

export const img = (path) => `/img/${path}`;

// Behance naslovnice projekata (učitavaju se izravno s Behancea).
const behanceCover = (file) => [
  `https://mir-s3-cdn-cf.behance.net/projects/808/${file}`,
  `https://mir-s3-cdn-cf.behance.net/projects/404/${file}`,
];

// Slike iz Behance projekata (moduli). Galerija prvo pokušava srednju veličinu.
const BEHANCE_MODULES = "https://mir-s3-cdn-cf.behance.net/project_modules";
const behanceModule = (entry) => {
  const [file, size = "max_1200_webp"] = entry.split("|");
  const medium = [`${BEHANCE_MODULES}/max_1200_webp/${file}`, `${BEHANCE_MODULES}/max_1200/${file}`, `${BEHANCE_MODULES}/${size}/${file}`];
  return { src: medium, full: [`${BEHANCE_MODULES}/${size}/${file}`, ...medium] };
};

/* ============================== OSOBNI PODACI ============================== */
export const person = {
  name: "Sandra Doblanović",
  firstName: "Sandra",
  role: { hr: "Grafička dizajnerica", en: "Graphic Designer" },
  roles: {
    hr: ["Ambalaža", "Produktna fotografija", "Vizualni identitet", "Print", "Web & WordPress", "Kampanje", "AI alati"],
    en: ["Packaging", "Product photography", "Visual identity", "Print", "Web & WordPress", "Campaigns", "AI tools"],
  },
  location: { hr: "Zagreb, Hrvatska", en: "Zagreb, Croatia" },
  email: "sandradoblanovic@gmail.com",
  phone: "+385 98 935 3457",
  phoneHref: "tel:+385989353457",
  photo: img("sandra.jpg"),
  links: [
    { label: "Behance", href: "https://www.behance.net/sandradoblanovi" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/sandra-doblanovic" },
    { label: "Instagram", href: "https://www.instagram.com/dsphotosd" },
  ],
  available: { hr: "Otvorena za nove suradnje", en: "Open to new opportunities" },
};

export const hero = {
  greeting: { hr: "Bok, ja sam Sandra.", en: "Hi, I'm Sandra." },
  titleA: { hr: "Dizajniram ", en: "I design " },
  // riječi se izmjenjuju jedna za drugom
  titleWords: {
    hr: ["ambalažu", "vizualne identitete", "tiskane materijale", "web stranice", "fotografije"],
    en: ["packaging", "visual identities", "print", "websites", "photography"],
  },
  titleB: {
    hr: "od ideje do gotovog proizvoda.",
    en: "from idea to finished product.",
  },
  lead: {
    hr: "Grafička dizajnerica s iskustvom u razvoju proizvoda, dizajnu ambalaže, pripremi za tisak, produktnim vizualima i administraciji web trgovina. Volim kad je dizajn lijep na prvi pogled i precizan do zadnjeg milimetra.",
    en: "Graphic designer with experience in product development, packaging design, prepress, product visuals and web shop administration. I like design that looks good at first glance and is precise down to the last millimetre.",
  },
};

/* ============================== ŠTO RADIM ============================== */
export const services = [
  {
    title: { hr: "Ambalaža i priprema za tisak", en: "Packaging & prepress" },
    text: {
      hr: "Dizajn kutija i etiketa, prilagodba dielineu, provjera datoteka i tehnički ispravan PDF za tiskaru.",
      en: "Box and label design, dieline adaptation, preflight checks and print-ready PDFs.",
    },
  },
  {
    title: { hr: "Produktna fotografija i obrada", en: "Product photography & retouching" },
    text: {
      hr: "Produktne, lifestyle i 360° fotografije — studijska rasvjeta, retuš i dorada uz pomoć AI alata.",
      en: "Product, lifestyle and 360° photography — studio lighting, retouching and AI-assisted refinement.",
    },
  },
  {
    title: { hr: "Vizualni identitet", en: "Visual identity" },
    text: {
      hr: "Logotipi, palete boja, tipografija i primjena na vizitke, memorandume, natpise i merch.",
      en: "Logos, colour palettes, typography and their use on cards, stationery, signage and merch.",
    },
  },
  {
    title: { hr: "Prijelom i print", en: "Editorial & print" },
    text: {
      hr: "Prijelom publikacija i brošura u InDesignu, vizitke, letci, plakati i promotivni materijali.",
      en: "Publication and brochure layout in InDesign, business cards, flyers, posters and promo materials.",
    },
  },
  {
    title: { hr: "Web i WordPress", en: "Web & WordPress" },
    text: {
      hr: "WordPress stranice i web trgovine, banneri i kampanje te front-end u HTML-u, CSS-u i Reactu.",
      en: "WordPress sites and web shops, banners and campaigns, plus front-end in HTML, CSS and React.",
    },
  },
  {
    title: { hr: "AI alati i dokumentacija", en: "AI tools & documentation" },
    text: {
      hr: "Korisničke upute i specifikacije te vlastiti alati i WordPress pluginovi izrađeni uz pomoć AI-ja.",
      en: "User manuals and specs, plus my own tools and WordPress plugins built with the help of AI.",
    },
  },
];

/* ============================== RADOVI ==============================
   Radovi su podijeljeni u skupine. Svaki projekt ima:
   - thumb: mala sličica (izostavi za karticu samo s tekstom)
   - scope: što projekt obuhvaća (kratka lista)
   - text: opis koji se vidi u pogledu projekta
   - images: slike u pogledu projekta (redom, velike)
   - href: ako postoji, kartica vodi na vanjsku stranicu umjesto pogleda projekta
   - kind: vrsta projekta — "work" (posao), "client" (za klijenta), "personal" (osobni)
           ili "edu" (edukacija / vježba). Izostavi ako ne želiš oznaku.
   - kit: popis opreme (za studio); svakoj stavci možeš dodati photo: img("...") za pravu fotografiju
   ==================================================================== */
const pic = (name, caption) => ({ src: img(`radovi/${name}.jpg`), caption });
const pic2 = (path) => ({ src: img(path) });

export const workGroups = [
  {
    id: "ambalaza",
    title: { hr: "Ambalaža i produktni dizajn", en: "Packaging & product design" },
    text: {
      hr: "Kutije, etikete i priprema za tisak — ambalaža koja je prepoznatljiva na polici i besprijekorna u proizvodnji.",
      en: "Boxes, labels and prepress — packaging that stands out on the shelf and holds up in production.",
    },
    projects: [
      {
        id: "kutije",
        kind: "work",
        title: { hr: "Ambalaža za elektroniku i male kućanske uređaje", en: "Electronics & small appliance packaging" },
        thumb: img("radovi/ambalaza-karaoke-cut.jpg"),
        scope: {
          hr: ["Dizajn kutije", "Lifestyle i produktne fotografije", "Ikone značajki", "Priprema za tisak"],
          en: ["Box design", "Lifestyle & product photos", "Feature icons", "Prepress"],
        },
        text: {
          hr: "Ambalaža za proizvode iz razvoja: dječji karaoke zvučnik s razigranom lifestyle fotografijom i kontaktni grill s proizvodom u prvom planu. Posao obuhvaća raspored na dielineu, obradu fotografija, ikone značajki, tekstove i tehnički ispravne datoteke za tiskaru.",
          en: "Packaging for products in development: a kids' karaoke speaker with a playful lifestyle photo and a contact grill with the product front and centre. The work covers dieline layout, photo editing, feature icons, copy and technically correct files for the printer.",
        },
        tools: ["Illustrator", "Photoshop", "InDesign"],
        images: [pic("ambalaza-karaoke-cut"), pic("ambalaza-grill")],
      },
      {
        id: "baredina",
        title: { hr: "Baredina — etikete i ambalaža", en: "Baredina — labels & packaging" },
        thumb: img("radovi/baredina-etikete-cut.jpg"),
        scope: {
          hr: ["Prednja i stražnja etiketa", "Ilustracija", "Display ambalaža", "QR kod"],
          en: ["Front & back label", "Illustration", "Display packaging", "QR code"],
        },
        text: {
          hr: "Etikete i ambalaža za istarsko ekstra djevičansko maslinovo ulje. Crno-zlatna prednja etiketa s ilustracijom stabla masline, zlatna stražnja etiketa s QR kodom te maslinasti display za policu.",
          en: "Labels and packaging for an Istrian extra virgin olive oil. A black-and-gold front label with an olive tree illustration, a gold back label with a QR code and an olive-green shelf display.",
        },
        tools: ["Illustrator", "Photoshop"],
        images: [pic("baredina-etikete-cut"), pic("baredina-ambalaza-cut")],
      },
    ],
  },
  {
    id: "foto",
    title: { hr: "Produktna fotografija i vizuali", en: "Product photography & visuals" },
    text: {
      hr: "Od snimanja u malom studijskom postavu do retuša, 360° prikaza i lifestyle vizuala.",
      en: "From shooting with a small studio setup to retouching, 360° views and lifestyle visuals.",
    },
    projects: [
      {
        id: "lifestyle",
        kind: "work",
        title: { hr: "Produktni i lifestyle vizuali", en: "Product & lifestyle visuals" },
        thumb: img("radovi/lifestyle-vizual.jpg"),
        scope: {
          hr: ["Lifestyle vizuali", "360° fotografija", "Retuš", "Dorada uz AI alate"],
          en: ["Lifestyle visuals", "360° photography", "Retouching", "AI-assisted refinement"],
        },
        text: {
          hr: "Vizuali proizvoda za web trgovine, kataloge i ambalažu: lifestyle scene, produktne i 360° fotografije. Fotografije obrađujem i retuširam u Photoshopu, a za dorade (proširenje pozadine, čišćenje, kompoziciju scene) koristim i AI alate.",
          en: "Product visuals for web shops, catalogues and packaging: lifestyle scenes, product shots and 360° photography. I edit and retouch in Photoshop and use AI tools for refinements such as extending backgrounds, clean-up and scene composition.",
        },
        tools: ["Photoshop", { hr: "AI alati", en: "AI tools" }],
        images: [pic("lifestyle-vizual")],
      },
      {
        id: "studio",
        title: { hr: "Mini foto studio za produktne fotografije", en: "Mini photo studio for product shots" },
        thumb: img("studio/studio-postav.jpg"),
        scope: {
          hr: ["Studijska rasvjeta", "Pozadinsko platno", "360° rotacijska platforma", "Foto box 40 × 40 cm", "Nikon D5500"],
          en: ["Studio lighting", "Backdrop", "360° turntable", "40 × 40 cm photo box", "Nikon D5500"],
        },
        text: {
          hr: "Za produktne fotografije koristim mali studijski postav: rasvjetu za ravnomjerno svjetlo bez oštrih sjena, pozadinska platna za čiste ili lifestyle pozadine, rotacijsku platformu za 360° prikaze, foto box 40 × 40 cm za manje proizvode i fotoaparat Nikon D5500. Iz istog postava nastaju fotografije za web trgovinu, ambalažu i kataloge.",
          en: "For product photos I use a small studio setup: lighting for even, soft light without harsh shadows, backdrop fabrics for clean or lifestyle backgrounds, a turntable for 360° views, a 40 × 40 cm photo box for smaller products and a Nikon D5500 camera. The same setup produces images for the web shop, packaging and catalogues.",
        },
        kit: [
          {
            icon: "light",
            photo: img("studio/light.jpg"),
            title: { hr: "Studijska rasvjeta", en: "Studio lighting" },
            text: { hr: "Mekano, ravnomjerno svjetlo bez oštrih sjena.", en: "Soft, even light without harsh shadows." },
          },
          {
            icon: "backdrop",
            photo: img("studio/backdrop.jpg"),
            title: { hr: "Pozadinska platna", en: "Backdrop fabrics" },
            text: { hr: "Čista bijela ili obojena pozadina, ovisno o namjeni.", en: "Clean white or coloured backgrounds, depending on use." },
          },
          {
            icon: "turntable",
            photo: img("studio/turntable.jpg"),
            title: { hr: "360° rotacijska platforma", en: "360° turntable" },
            text: { hr: "Niz fotografija iz svih kutova za interaktivni 360° prikaz.", en: "A full set of angles for an interactive 360° view." },
          },
          {
            icon: "box",
            photo: img("studio/box.jpg"),
            title: { hr: "Foto box 40 × 40 cm", en: "40 × 40 cm photo box" },
            text: { hr: "Za male proizvode i dodatke, s kontroliranim svjetlom.", en: "For small products and accessories, with controlled light." },
          },
          {
            icon: "camera",
            photo: img("studio/nikon.jpg"),
            title: { hr: "Nikon D5500", en: "Nikon D5500" },
            text: { hr: "Fotoaparat za produktne i 360° serije fotografija.", en: "The camera for product shots and 360° photo series." },
          },
        ],
        images: [pic2("studio/studio-postav.jpg")],
      },
    ],
  },
  {
    id: "identitet",
    title: { hr: "Vizualni identitet i grafički dizajn", en: "Visual identity & graphic design" },
    text: {
      hr: "Znakovi, palete i tipografija te njihova primjena — od vizitki i mercha do publikacija.",
      en: "Marks, palettes and typography and how they're applied — from business cards and merch to publications.",
    },
    projects: [
      {
        id: "vizitke",
        title: { hr: "Izrada vizitki", en: "Business cards" },
        thumb: img("radovi/dorigami-vizitka-cut.jpg"),
        scope: {
          hr: ["Dizajn prednje i stražnje strane", "Hijerarhija kontakt podataka", "Priprema za tisak"],
          en: ["Front & back design", "Contact hierarchy", "Prepress"],
        },
        text: {
          hr: "Vizitke za tri različita klijenta, svaka u jeziku svog identiteta. Dorigami: geometrijski origami znak u zlatnim tonovima na tamnoljubičastoj podlozi, a na poleđini kontakti i web adresa uz ukrasnu traku s rozetom. Studio Design: tamna brušena metalna tekstura s magenta-ljubičastim valom. Drive Safe: živa zelena i tamnoplava iz identiteta agencije, sa sloganom na prednjoj strani i ikonama kontakata na stražnjoj.",
          en: "Business cards for three different clients, each speaking the language of its own identity. Dorigami: a geometric origami mark in gold tones on deep plum, with the contacts and web address on the back beside a decorative band with the rosette. Studio Design: a dark brushed-metal texture with a magenta-violet wave. Drive Safe: the agency's vivid green and deep blue, with the slogan on the front and contact icons on the back.",
        },
        tools: ["Illustrator", "Photoshop"],
        images: [
          pic("dorigami-vizitka-cut"),
          pic("studio-design-vizitke-cut"),
          pic("drive-safe-vizitke-izrez-cut"),
        ],
      },
      {
        id: "wash",
        title: { hr: "W.A.S.H. — vizualni identitet", en: "W.A.S.H. — visual identity" },
        thumb: img("radovi/wash-memorandum.jpg"),
        scope: {
          hr: ["Logo", "Memorandum i kuverte", "Brošura", "Izlog i natpisi"],
          en: ["Logo", "Stationery", "Brochure", "Shop window & signage"],
        },
        text: {
          hr: "Identitet samoposlužne praonice rublja „Wait And Stay Happy”: slova obješena na štipaljke, vodeni motivi i vesela paleta. Primijenjen na memorandum, kuverte, vizitke, brošuru, izlog i natpise.",
          en: "An identity for the self-service laundry “Wait And Stay Happy”: letters hung on clothes pegs, water motifs and a cheerful palette. Applied to stationery, envelopes, cards, a brochure, shop windows and signage.",
        },
        tools: ["Illustrator", "InDesign", "Photoshop"],
        images: [pic("wash-memorandum"), pic("wash-brosura"), pic("wash-izlog")],
      },
      {
        id: "drive-safe",
        title: { hr: "Drive Safe — Rent A Car", en: "Drive Safe — Rent A Car" },
        thumb: img("radovi/drive-safe-vizitke-izrez-cut.jpg"),
        scope: {
          hr: ["Logo", "Paleta i tipografija", "Vizitke", "Merch i oglašavanje"],
          en: ["Logo", "Palette & typography", "Business cards", "Merch & ads"],
        },
        text: {
          hr: "Identitet agencije za najam vozila: znak s automobilom i inicijalima, zeleno-plava paleta, Fira Sans kao tipografija te primjena na vizitke, odjeću, šalice i oglase.",
          en: "An identity for a car rental agency: a car-and-initials mark, a green-and-blue palette, Fira Sans as the typeface and applications on cards, apparel, mugs and ads.",
        },
        tools: ["Illustrator", "Photoshop"],
        images: ["drive-safe-logo-cut", "drive-safe-boje", "drive-safe-vizitke-izrez-cut", "drive-safe-merch"].map((n) => pic(n)),
        link: { label: "Behance", href: "https://www.behance.net/gallery/179541989/Rent-A-Car-Drive-Safe" },
      },
      {
        id: "hairway",
        title: { hr: "Hairway to Heaven", en: "Hairway to Heaven" },
        thumb: img("radovi/hairway-identitet.jpg"),
        scope: {
          hr: ["Logo", "Društvene mreže", "Cjenik", "Natpisi i merch"],
          en: ["Logo", "Social media", "Price list", "Signage & merch"],
        },
        text: {
          hr: "Identitet frizerskog salona u crno-zlatnoj paleti: logo, objave za društvene mreže, cjenik usluga, natpisi i merch.",
          en: "A black-and-gold identity for a hair salon: logo, social media posts, price list, signage and merch.",
        },
        tools: ["Illustrator", "Photoshop", "InDesign"],
        images: ["hairway-identitet", "hairway-cjenik", "hairway-merch"].map((n) => pic(n)),
        link: { label: "Behance", href: "https://www.behance.net/gallery/180639775/Hair-salon-Hairway-To-Heaven" },
      },
      {
        id: "stories",
        title: { hr: "Stories of Change — prijelom publikacije", en: "Stories of Change — editorial layout" },
        thumb: img("radovi/stories-naslovnica.jpg"),
        scope: {
          hr: ["Prijelom stranica", "Tipografska hijerarhija", "Obrada fotografija", "Priprema za tisak"],
          en: ["Page layout", "Typographic hierarchy", "Photo editing", "Prepress"],
        },
        text: {
          hr: "Prijelom višestranične publikacije s pričama o uspjehu: naslovnica, dvostrane s dijagonalnim kompozicijama teksta i fotografije, istaknuti citati te stranice „Lessons Learned” i „Key Message”. Uz osnovni prijelom izrađena je i alternativna varijanta u drukčijem stilu. Sve je složeno u InDesignu, s dosljednim stilovima odlomaka i pripremom za tisak.",
          en: "Layout of a multi-page publication featuring success stories: a cover, spreads with diagonal text-and-image compositions, pull quotes and the “Lessons Learned” and “Key Message” pages. Alongside the main layout I also designed an alternative version in a different style. Everything was set in InDesign with consistent paragraph styles and prepared for print.",
        },
        tools: ["InDesign", "Photoshop", "Acrobat"],
        images: [
          pic("stories-pregled"),
          pic("stories-naslovnica"),
          pic("stories-2-3"),
          pic("stories-6-7"),
          pic("stories-mobilno"),
        ],
        link: { label: "Behance", href: "https://www.behance.net/gallery/217215077/Booklet-Examples" },
      },
      {
        id: "ilustracija",
        title: { hr: "Ilustracija i digitalna grafika", en: "Illustration & digital art" },
        thumb: img("radovi/bicikl-merch-cut.jpg"),
        scope: {
          hr: ["Vektorska ilustracija", "Merch", "Apstraktne pozadine"],
          en: ["Vector illustration", "Merch", "Abstract wallpapers"],
        },
        text: {
          hr: "Vektorska ilustracija bicikla primijenjena na majice, torbe, šalice — pa i kao tattoo — te serija apstraktnih digitalnih pozadina.",
          en: "A vector bicycle illustration applied to T-shirts, tote bags, mugs — and even as a tattoo — plus a series of abstract digital wallpapers.",
        },
        tools: ["Illustrator", "Photoshop"],
        images: [pic("bicikl-merch-cut"), pic("bicikl-tattoo"), pic("apstraktne-pozadine")],
      },
    ],
  },
  {
    id: "web",
    title: { hr: "Digitalni sadržaj i web", en: "Digital content & web" },
    text: {
      hr: "Web stranice koje sam izradila u Reactu i rad s WordPressom i web trgovinama.",
      en: "Websites I've built in React and work with WordPress and web shops.",
    },
    projects: [
      {
        id: "dorigami-web",
        kind: "client",
        title: { hr: "Dorigami", en: "Dorigami" },
        thumb: img("radovi/web-dorigami.jpg"),
        scope: { hr: ["React", "HR/EN", "Galerija i virtualna šetnja"], en: ["React", "HR/EN", "Gallery & virtual walk"] },
        text: {
          hr: "Dvojezična React stranica za origami umjetnicu: galerija radova, virtualna šetnja izložbom, tehnike i cjenik.",
          en: "A bilingual React site for an origami artist: a gallery of works, a virtual exhibition walk, techniques and prices.",
        },
        href: "https://dorigami.netlify.app/",
      },
      {
        id: "ds-studio",
        kind: "personal",
        title: { hr: "DS Design Studio", en: "DS Design Studio" },
        thumb: img("radovi/web-ds-studio.jpg"),
        scope: { hr: ["React", "Višejezična stranica"], en: ["React", "Multilingual site"] },
        text: {
          hr: "Višejezična React stranica za studio fotografije, dizajna, videa i weba.",
          en: "A multilingual React site for a photo, design, video and web studio.",
        },
        href: "https://design-studio-ds.netlify.app/",
      },
      {
        id: "manestra",
        kind: "edu",
        title: { hr: "Maneštra Catering", en: "Maneštra Catering" },
        thumb: img("radovi/web-manestra.jpg"),
        scope: { hr: ["Front-end", "Ispitni projekt"], en: ["Front-end", "Final exam project"] },
        text: {
          hr: "Stranica catering servisa — ispitni projekt front-end developer programa.",
          en: "A catering website — the final exam project of my front-end developer programme.",
        },
        href: "https://manestracatering.netlify.app/",
      },
    ],
  },
  {
    id: "kampanje",
    title: { hr: "Društvene mreže i kampanje", en: "Social media & campaigns" },
    text: {
      hr: "Video najave, animirani banneri i vizuali za sezonske kampanje.",
      en: "Video announcements, animated banners and visuals for seasonal campaigns.",
    },
    projects: [
      {
        id: "video",
        title: { hr: "Videomontaža i animirani banneri", en: "Video editing & animated banners" },
        thumb: behanceCover("da02e7178938489.Y3JvcCw5MTIsNzEzLDEwMywyODY.png"),
        scope: {
          hr: ["Video najava", "Animirani banneri", "Black Friday i Cyber Week"],
          en: ["Video announcement", "Animated banners", "Black Friday & Cyber Week"],
        },
        text: {
          hr: "Kratka video najava te animirani web banneri za sezonske kampanje (Black Friday, Cyber Week) — od grafike i animacije do montaže i izvoza u više formata.",
          en: "A short video announcement and animated web banners for seasonal campaigns (Black Friday, Cyber Week) — from graphics and animation to editing and export in multiple formats.",
        },
        tools: ["Photoshop", "Illustrator", { hr: "Montaža videa", en: "Video editing" }],
        images: [
          { src: behanceCover("da02e7178938489.Y3JvcCw5MTIsNzEzLDEwMywyODY.png") },
          { src: behanceCover("d90aff185822085.Y3JvcCwyMTMzLDE2NjgsMCwyNDg.png") },
          { src: behanceCover("77608d185821561.Y3JvcCw0NDUxLDM0ODEsMCw1MDY.png") },
        ],
        link: { label: "Behance", href: "https://www.behance.net/gallery/178938489/Video-announcement" },
      },
    ],
  },
  {
    id: "ai",
    title: { hr: "Rad uz AI alate", en: "AI-assisted workflow" },
    text: {
      hr: "Alati koje sam uz pomoć AI-ja izradila da bi svakodnevni posao bio brži i točniji.",
      en: "Tools I've built with the help of AI to make everyday work faster and more accurate.",
    },
    projects: [
      {
        id: "wp-pluginovi",
        kind: "work",
        title: { hr: "WordPress pluginovi", en: "WordPress plugins" },
        icon: "WP",
        scope: {
          hr: ["Izrađeno uz AI", "Svakodnevna upotreba na poslu"],
          en: ["Built with AI", "Used daily at work"],
        },
        text: {
          hr: "WordPress koristim svakodnevno na poslu, pa sam uz pomoć AI alata izradila vlastite pluginove koji mi olakšavaju i ubrzavaju rad — umjesto ponavljanja istih koraka ručno, posao odrađuje plugin.",
          en: "I use WordPress every day at work, so with the help of AI tools I built my own plugins that make the work easier and faster — instead of repeating the same steps by hand, the plugin does it.",
        },
        tools: ["WordPress", { hr: "AI alati", en: "AI tools" }],
      },
      {
        id: "dokumentacija",
        kind: "work",
        title: { hr: "Alat za ažuriranje produktne dokumentacije", en: "Product documentation update tool" },
        icon: "DOC",
        scope: {
          hr: ["Izrađeno uz AI", "Tehnička dokumentacija", "Ušteda vremena"],
          en: ["Built with AI", "Technical documentation", "Time saving"],
        },
        text: {
          hr: "Uz pomoć AI alata izradila sam program koji olakšava ažuriranje dokumentacije za proizvode koje razvijamo na poslu. Ono što je prije zahtijevalo puno ručnog rada sada je brže, preglednije i s manje mogućnosti za grešku.",
          en: "With the help of AI tools I built a program that makes it easier to update the documentation for the products we develop at work. What used to take a lot of manual work is now faster, clearer and less error-prone.",
        },
        tools: [{ hr: "AI alati", en: "AI tools" }],
      },
    ],
  },
];

/* ============================== O MENI ============================== */
export const about = {
  lead: {
    hr: "Dizajniram vizuale koji izgledaju dobro i rade točno ono što trebaju — na polici trgovine, u tisku i na ekranu.",
    en: "I design visuals that look good and do exactly what they need to — on the shelf, in print and on screen.",
  },
  paragraphs: [
    {
      hr: "Trenutno radim kao junior grafička dizajnerica u odjelu razvoja proizvoda, gdje svakodnevno pripremam ambalažu, promotivne materijale, tehničke specifikacije i korisničke upute te obrađujem produktne, lifestyle i 360° fotografije. Najviše uživam u trenutku kad kreativna ideja postane tehnički precizan, tiskarski ispravan proizvod.",
      en: "I currently work as a junior graphic designer in a product development department, preparing packaging, promotional materials, technical specifications and user manuals, and editing product, lifestyle and 360° photography. My favourite moment is when a creative idea becomes a technically precise, print-ready product.",
    },
    {
      hr: "U radu se oslanjam i na AI alate: za doradu fotografija, ali i za izradu vlastitih rješenja — WordPress pluginova koji mi olakšavaju svakodnevni posao i programa za brže ažuriranje produktne dokumentacije.",
      en: "I also rely on AI tools in my work: for refining photos, and for building my own solutions — WordPress plugins that make my daily work easier and a program that speeds up updating product documentation.",
    },
    {
      hr: "Moj put nije bio klasičan. Nakon Učiteljske akademije gotovo sam desetljeće radila kao učiteljica informatike i usput održavala školski CMS. Ta me znatiželja odvela na Algebru — prvo na grafički, zatim na web dizajn — a potom i na front-end development. Izvan ureda fotografiram putovanja, svjetlo i ljude u prostoru.",
      en: "My path wasn't a typical one. After graduating in primary education I spent almost a decade teaching informatics and maintaining the school CMS. That curiosity led me to Algebra — first graphic design, then web design — and later front-end development. Outside the office I photograph travel, light and people in places.",
    },
  ],
  facts: [
    { value: "2+", label: { hr: "godine u grafičkom dizajnu", en: "years in graphic design" } },
    { value: "~10", label: { hr: "godina rada s ljudima u učionici", en: "years working with people in the classroom" } },
    { value: "AI", label: { hr: "u svakodnevnom radu — od fotografija do vlastitih alata", en: "in everyday work — from photos to my own tools" } },
  ],
};

/* ============================== FOTOGRAFIJA ============================== */
// Kolekcija s Behancea ("My Photo Collection"), format "datoteka|najveća_veličina".
// Za vlastitu fotografiju iz projekta dodaj na kraj popisa `photos`:
//   { src: img("foto/naziv.jpg"), alt: "Opis" }
const behancePhotos = [
  "c573bc178889083.64efc62aab5b2.png|max_3840_webp",
  "383e37178889083.64efc62aadf13.jpeg|max_3840_webp",
  "4d847d178889083.64efc62abab4e.jpeg|max_3840_webp",
  "3a9464178889083.64efc62ab6c8f.png|max_3840_webp",
  "b9323f178889083.64efc62abd9b3.jpeg|max_3840_webp",
  "2aeb7a178889083.64efc62ab6106.jpeg|1400_webp",
  "fcd257178889083.64efc62ab8eb0.jpeg|max_3840_webp",
  "1e1175178889083.64efc62ab0388.jpeg|max_3840_webp",
  "902d0b178889083.64efc62ab78f0.jpeg|max_3840_webp",
  "d833cd178889083.64efc62abe9a6.jpeg|max_3840_webp",
  "cde759178889083.64efc62ab370b.jpeg|fs_webp",
  "d18082178889083.64efc62aad254.jpeg|max_3840_webp",
  "dcef06178889083.64efc62ab104b.jpeg|max_3840_webp",
  "c54341178889083.64efc62ab2ccf.jpeg|max_3840_webp",
  "9c67ed178889083.64efc62aaf6f4.jpeg|1400_webp",
  "cfac13178889083.64efc62abba7d.jpg|max_3840_webp",
  "e3f1d6178889083.64efc62ab4446.jpeg|max_3840_webp",
  "236d47178889083.64efc62abcccf.jpg|max_3840_webp",
  "a2e9f6178889083.64efc62ab9de4.jpeg|max_3840_webp",
  "40f55a178889083.64efc62ab1cfc.jpg|max_3840_webp",
  "d4bbf5178889083.64efc62ab5362.jpeg|max_3840_webp",
  "41bd6a178889083.64efc62aac5a1.jpg|max_3840_webp",
  "0268c7178889083.64efc62aaebe4.jpg|max_3840_webp",
  "1c4c2f178889083.64efc62ab82b6.jpeg|max_1200_webp",
];

export const photos = behancePhotos.map((entry, i) => ({
  ...behanceModule(entry),
  alt: `Sandra Doblanović — ${String(i + 1).padStart(2, "0")}`,
  no: String(i + 1).padStart(2, "0"),
}));

/* ============================== ISKUSTVO ============================== */
export const experience = [
  {
    role: { hr: "Junior grafička dizajnerica — razvoj proizvoda", en: "Junior Graphic Designer — Product Development" },
    place: { hr: "Korporacija, Zagreb", en: "Corporation, Zagreb" },
    text: {
      hr: "Ambalaža, priprema za tisak i digitalne kanale, obrada produktnih, lifestyle i 360° fotografija, promotivni materijali, kampanje, tehničke specifikacije i korisničke upute. Rad u WordPressu i izrada internih alata i pluginova uz pomoć AI-ja.",
      en: "Packaging, prepress and digital assets, product, lifestyle and 360° photo editing, promotional materials, campaigns, technical specifications and user manuals. Working in WordPress and building internal tools and plugins with the help of AI.",
    },
    current: true,
  },
  {
    role: { hr: "Web administratorica i grafička dizajnerica", en: "Web Administrator & Graphic Designer" },
    place: { hr: "Kult Home", en: "Kult Home" },
    text: {
      hr: "Održavanje WordPress web trgovine, vizuali za kampanje, letci i banneri, komunikacija s kupcima i dobavljačima.",
      en: "Running the WordPress web shop, campaign visuals, flyers and banners, communication with customers and suppliers.",
    },
  },
  {
    role: { hr: "Učiteljica informatike", en: "Informatics Teacher" },
    place: { hr: "OŠ Gustava Krkleca i OŠ Matije Gupca, Zagreb", en: "Gustav Krklec and Matija Gubec Elementary Schools, Zagreb" },
    text: {
      hr: "Gotovo desetljeće nastave informatike uz održavanje školskog CMS-a i digitalnih sadržaja.",
      en: "Almost a decade of teaching informatics while maintaining the school CMS and digital content.",
    },
  },
];

export const education = [
  { title: { hr: "Front-end development", en: "Front-end development" }, place: { hr: "Završeno", en: "Completed" } },
  { title: { hr: "Web dizajn", en: "Web design" }, place: { hr: "Algebra, Zagreb", en: "Algebra, Zagreb" } },
  { title: { hr: "Grafički dizajn", en: "Graphic design" }, place: { hr: "Algebra, Zagreb", en: "Algebra, Zagreb" } },
  {
    title: { hr: "Magistra primarnog obrazovanja, modul informatika", en: "MA in Primary Education, Informatics" },
    place: { hr: "Učiteljska akademija, Zagreb", en: "Faculty of Teacher Education, Zagreb" },
  },
];

export const skills = [
  { group: { hr: "Dizajn", en: "Design" }, items: ["Photoshop", "Illustrator", "InDesign", "Acrobat", { hr: "CorelDRAW (osnove)", en: "CorelDRAW (basic)" }] },
  { group: { hr: "Web", en: "Web" }, items: ["WordPress", "HTML", "CSS", "JavaScript", "React"] },
  {
    group: { hr: "Foto & video", en: "Photo & video" },
    items: [
      { hr: "Studijska rasvjeta", en: "Studio lighting" },
      { hr: "360° fotografija", en: "360° photography" },
      { hr: "Retuš", en: "Retouching" },
      { hr: "Montaža videa", en: "Video editing" },
    ],
  },
  {
    group: { hr: "AI alati", en: "AI tools" },
    items: [
      { hr: "AI dorada fotografija", en: "AI photo refinement" },
      { hr: "WordPress pluginovi uz AI", en: "WordPress plugins with AI" },
      { hr: "Alati za automatizaciju", en: "Automation tools" },
    ],
  },
  {
    group: { hr: "Ostalo", en: "Other" },
    items: [
      { hr: "Priprema za tisak", en: "Prepress" },
      "MS Office",
      { hr: "Hrvatski · Engleski", en: "Croatian · English" },
      { hr: "Vozačka B", en: "Driving licence B" },
    ],
  },
];
