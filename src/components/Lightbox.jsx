import { useEffect, useCallback } from "react";
import Img from "./Img";
import { useT } from "../i18n";

/**
 * Prikaz preko cijelog ekrana za projekte i fotografije.
 * items: [{ src, full, alt, caption }]
 * Tipkovnica: ← → za listanje, Esc za zatvaranje.
 */
export default function Lightbox({ items, index, onClose, onChange, title, text, link }) {
  const t = useT();
  const count = items.length;
  const prev = useCallback(() => onChange((index - 1 + count) % count), [index, count, onChange]);
  const next = useCallback(() => onChange((index + 1) % count), [index, count, onChange]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        e.stopImmediatePropagation();
        onClose();
      }
      if (e.key === "ArrowLeft" && count > 1) {
        e.stopImmediatePropagation();
        prev();
      }
      if (e.key === "ArrowRight" && count > 1) {
        e.stopImmediatePropagation();
        next();
      }
    };
    // capture: lightbox ima prednost pred izložbom ispod njega
    window.addEventListener("keydown", onKey, true);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey, true);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose, prev, next, count]);

  const item = items[index];

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={title || item.alt} onClick={onClose}>
      <div className="lightbox__inner" onClick={(e) => e.stopPropagation()}>
        <button className="lightbox__close" onClick={onClose} aria-label={t.ui("close")}>
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>

        <figure className="lightbox__figure">
          <Img key={index + String(item.full || item.src)} src={item.full || item.src} alt={item.alt} className="lightbox__img" />
        </figure>

        <div className="lightbox__bar">
          <div className="lightbox__info">
            {title && <h3>{title}</h3>}
            {text && <p>{text}</p>}
            {!title && item.caption && <p>{item.caption}</p>}
            {link && (
              <a href={link.href} target="_blank" rel="noreferrer" className="text-link">
                {link.label} <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>
          {count > 1 && (
            <div className="lightbox__nav">
              <button onClick={prev} aria-label={t.ui("prev")}>←</button>
              <span>
                {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
              </span>
              <button onClick={next} aria-label={t.ui("next")}>→</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
