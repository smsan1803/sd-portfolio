import { useState } from "react";

/**
 * Slika s rezervnim izvorima: `src` može biti string ili niz URL-ova.
 * Ako se prvi ne učita, pokušava sljedeći; ako nijedan ne uspije,
 * prikazuje se nježni placeholder umjesto razbijene slike.
 */
export default function Img({ src, alt, className = "", ...rest }) {
  const sources = Array.isArray(src) ? src : [src];
  const [index, setIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);

  if (index >= sources.length) {
    return (
      <div className={`img-fallback ${className}`} role="img" aria-label={alt}>
        <span>{alt}</span>
      </div>
    );
  }

  return (
    <img
      src={sources[index]}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={`${className} ${loaded ? "is-loaded" : ""}`}
      onLoad={() => setLoaded(true)}
      onError={() => setIndex((i) => i + 1)}
      {...rest}
    />
  );
}
