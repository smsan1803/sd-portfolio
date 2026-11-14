import { useEffect } from "react";
import Img from "./Img";
import KindBadge from "./KindBadge";
import KitIcon from "./KitIcon";
import { useT } from "../i18n";

/**
 * Pogled projekta: naslov, opis, što obuhvaća, alati i velike slike jedna ispod druge.
 * Klik na sliku otvara je preko cijelog ekrana (onOpenImage).
 */
export default function ProjectModal({ project, group, onClose, onOpenImage, paused }) {
  const t = useT();

  useEffect(() => {
    if (paused) return undefined;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, paused]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const images = project.images || [];

  return (
    <div className="pm" role="dialog" aria-modal="true" aria-label={t(project.title)} onClick={onClose}>
      <div className="pm__sheet" onClick={(e) => e.stopPropagation()}>
        <header className="pm__bar">
          <span className="pm__group">{t(group.title)}</span>
          <button className="pm__close" onClick={onClose} aria-label={t.ui("close")}>
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </header>

        <div className="pm__head">
          <KindBadge kind={project.kind} />
          <h2>{t(project.title)}</h2>
          <div className="pm__cols">
            <p className="pm__text">{t(project.text)}</p>
            <dl className="pm__meta">
              <div>
                <dt>{t.ui("includes")}</dt>
                <dd>
                  <ul className="chips">
                    {t(project.scope).map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </dd>
              </div>
              {project.tools && (
                <div>
                  <dt>{t.ui("tools")}</dt>
                  <dd>{project.tools.map((tool) => t(tool)).join(" · ")}</dd>
                </div>
              )}
              {project.link && (
                <div>
                  <dd>
                    <a className="text-link" href={project.link.href} target="_blank" rel="noreferrer">
                      {project.link.label} <span aria-hidden="true">↗</span>
                    </a>
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </div>

        {project.kit && (
          <ul className="kit">
            {project.kit.map((k) => (
              <li className="kit__item" key={k.icon + t(k.title)}>
                <span className="kit__visual">
                  {k.photo ? <Img src={k.photo} alt={t(k.title)} /> : <KitIcon name={k.icon} />}
                </span>
                <strong>{t(k.title)}</strong>
                <span>{t(k.text)}</span>
              </li>
            ))}
          </ul>
        )}

        {images.length > 0 && (
          <div className="pm__images">
            {images.map((im, i) => (
              <button key={i} className="pm__img" onClick={() => onOpenImage(i)} aria-label={`${t.ui("open")}: ${t(project.title)} ${i + 1}`}>
                <Img src={im.src} alt={`${t(project.title)} — ${i + 1}`} />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
