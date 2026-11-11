# Sandra Doblanović — portfolio (React)

Portfolio izrađen u Reactu (Vite).

## Pokretanje u VS Codeu

1. Otvori mapu `sandra-portfolio` u VS Codeu.
2. U terminalu (`Ctrl + ~`) pokreni:

```bash
npm install
npm run dev
```

Stranica se otvara na http://localhost:5173.

## Objava

```bash
npm run build
```

Sadržaj mape `dist/` uploadaš na hosting (npr. FTP na edukacija.online, Netlify ili GitHub Pages).
Na Netlifyju se build pokreće sam nakon pusha na GitHub (postavke su u `netlify.toml`).

## Gdje se što mijenja

| Što | Gdje |
| --- | --- |
| Svi tekstovi, iskustvo, vještine, linkovi | `src/data.jsx` |
| Radovi (skupine, pločice, pogled projekta) | `workGroups` u `src/data.jsx` |
| Fotografije za galeriju i izložbu | popis `behancePhotos` u `src/data.jsx` |
| Engleski / hrvatski tekstovi | `src/data.jsx` (sadržaj) i `src/i18n.js` (gumbi, naslovi) |
| Slike radova | `public/img/radovi/` |
| Profilna fotografija | `public/img/sandra.jpg` |
| Boje i fontovi | vrh datoteke `src/styles.css` (`:root`) |

### Fotografije na izložbi

Fotografije dolaze s Behancea (popis `behancePhotos` u `src/data.jsx`). Novu dodaš tako da u popis
upišeš naziv datoteke s Behancea u obliku `"naziv.jpeg|max_3840_webp"`.

### Dodavanje novog projekta

U `src/data.jsx`, u `workGroups`, odaberi skupinu i u njezin `projects` kopiraj postojeći projekt pa promijeni podatke.
`thumb` je mala sličica (izostavi je za karticu samo s tekstom), `scope` je popis onoga što projekt obuhvaća,
a `images` su velike slike u pogledu projekta. Ako projekt ima `href`, kartica vodi na tu stranicu.

## Napomena o slikama

Neke slike (Behance naslovnice i fotografije) učitavaju se izravno s interneta.
Ako želiš da sve radi i bez toga, preuzmi ih u `public/img/` i u `src/data.jsx` zamijeni URL s `img("...")`.
Ako se neka slika ne učita, umjesto nje se prikazuje uredan placeholder.

## Fontovi

Plus Jakarta Sans (naslovi) + Inter (tekst), oba s Google Fontsa.

## Dvojezičnost

Gumb HR / EN u izborniku mijenja jezik, a odabir se pamti u pregledniku.
Svaki tekst u `src/data.jsx` zapisan je kao `{ hr: "...", en: "..." }`.

## Virtualna izložba

Gumb „Uđi na izložbu” u sekciji Fotografija otvara izložbu preko cijelog ekrana.
Prikazuju se sve fotografije iz popisa `photos`. Posjetitelj se kreće kotačićem miša, strelicama,
povlačenjem ili prstom na mobitelu. Šetnja kreće sama; dodir slike, strelice ili kotačića je zaustavlja,
a gumb ▶ je ponovno pokreće. Klik na zaustavljenu sliku otvara uvećani prikaz. Esc zatvara izložbu.
