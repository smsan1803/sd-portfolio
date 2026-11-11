import { useEffect, useRef, useState, useCallback } from "react";
import Img from "./Img";
import { useT } from "../i18n";
import { person } from "../data";

const AUTO_DELAY = 4200; // koliko se dugo stoji ispred svake slike (ms)
const AUTO_START = 2200; // pauza na uvodnom zidu prije kretanja (ms)
const EASE = 0.06; // mekoća kretanja (manje = sporije i mekše)

/**
 * Virtualna izložba: fotografije obješene na zid galerije.
 * Šetnja kreće sama; dodir slike, strelice, kotačić ili povlačenje je zaustavljaju.
 * Svo kretanje ide kroz jedan "motor" koji mekano klizi prema cilju.
 */
export default function Exhibition({ photos, onClose, onOpenPhoto, paused }) {
  const t = useT();
  const trackRef = useRef(null);
  const roomRef = useRef(null);
  const target = useRef(0);
  const raf = useRef(0);
  const running = useRef(false);
  const touching = useRef(false);
  const drag = useRef({ active: false, moved: false, x: 0, left: 0 });
  const [current, setCurrent] = useState(0); // 0 = uvodni zid
  const [progress, setProgress] = useState(0);
  const [playing, setPlaying] = useState(true);

  const pieces = () => Array.from(trackRef.current?.querySelectorAll("[data-stop]") || []);
  const total = photos.length;
  const lastStop = total + 1;

  /* ---- perspektiva: slike se okreću prema posjetitelju ---- */
  const update = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const vw = track.clientWidth;
    const mid = vw / 2;
    let nearest = 0;
    let best = Infinity;
    pieces().forEach((el, i) => {
      const r = el.getBoundingClientRect();
      const d = (r.left + r.width / 2 - mid) / vw;
      const ad = Math.min(Math.abs(d), 1.2);
      el.style.setProperty("--rot", `${Math.max(-30, Math.min(30, -d * 30))}deg`);
      el.style.setProperty("--scale", (1 - ad * 0.12).toFixed(4));
      el.style.setProperty("--light", (1 - Math.min(ad * 1.1, 0.75)).toFixed(3));
      if (Math.abs(d) < best) {
        best = Math.abs(d);
        nearest = i;
      }
    });
    setCurrent(nearest);
    const max = track.scrollWidth - vw;
    setProgress(max > 0 ? track.scrollLeft / max : 0);
    roomRef.current?.style.setProperty("--walk", `${track.scrollLeft}px`);
  }, []);

  /* ---- motor kretanja ---- */
  const step = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const cur = track.scrollLeft;
    const diff = target.current - cur;
    if (Math.abs(diff) < 0.5) {
      track.scrollLeft = target.current;
      running.current = false;
      return;
    }
    track.scrollLeft = cur + diff * EASE;
    raf.current = requestAnimationFrame(step);
  }, []);

  const glideTo = useCallback(
    (x) => {
      const track = trackRef.current;
      if (!track) return;
      const max = track.scrollWidth - track.clientWidth;
      target.current = Math.max(0, Math.min(max, x));
      if (!running.current) {
        running.current = true;
        raf.current = requestAnimationFrame(step);
      }
    },
    [step]
  );

  const stopGlide = useCallback(() => {
    cancelAnimationFrame(raf.current);
    running.current = false;
  }, []);

  const goTo = useCallback(
    (i) => {
      const list = pieces();
      const el = list[Math.max(0, Math.min(list.length - 1, i))];
      const track = trackRef.current;
      if (!el || !track) return;
      glideTo(el.offsetLeft + el.offsetWidth / 2 - track.clientWidth / 2);
    },
    [glideTo]
  );

  const userTookOver = () => setPlaying(false);

  /* ---- događaji: scroll, kotačić, dodir ---- */
  useEffect(() => {
    const track = trackRef.current;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
      if (touching.current) target.current = track.scrollLeft;
    };
    const onWheel = (e) => {
      e.preventDefault();
      setPlaying(false);
      const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      const base = running.current ? target.current : track.scrollLeft;
      glideTo(base + delta * 1.6);
    };
    const onTouchStart = () => {
      touching.current = true;
      stopGlide();
      setPlaying(false);
    };
    const onTouchEnd = () => {
      touching.current = false;
      target.current = track.scrollLeft;
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    track.addEventListener("wheel", onWheel, { passive: false });
    track.addEventListener("touchstart", onTouchStart, { passive: true });
    track.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    track.focus({ preventScroll: true });
    return () => {
      cancelAnimationFrame(frame);
      stopGlide();
      track.removeEventListener("scroll", onScroll);
      track.removeEventListener("wheel", onWheel);
      track.removeEventListener("touchstart", onTouchStart);
      track.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("resize", onScroll);
      document.body.style.overflow = prevOverflow;
    };
  }, [update, glideTo, stopGlide]);

  /* ---- automatska šetnja ---- */
  useEffect(() => {
    if (!playing || paused) return undefined;
    if (current >= lastStop) {
      setPlaying(false);
      return undefined;
    }
    const id = setTimeout(() => goTo(current + 1), current === 0 ? AUTO_START : AUTO_DELAY);
    return () => clearTimeout(id);
  }, [playing, paused, current, goTo, lastStop]);

  /* ---- tipkovnica ---- */
  useEffect(() => {
    if (paused) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") {
        e.preventDefault();
        setPlaying(false);
        goTo(current + 1);
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setPlaying(false);
        goTo(current - 1);
      }
      if (e.key === " ") {
        e.preventDefault();
        setPlaying((p) => !p);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current, goTo, onClose, paused]);

  /* ---- povlačenje mišem ---- */
  const onPointerDown = (e) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    stopGlide();
    drag.current = { active: true, moved: false, x: e.clientX, left: trackRef.current.scrollLeft };
  };
  const onPointerMove = (e) => {
    const d = drag.current;
    if (!d.active) return;
    const dx = e.clientX - d.x;
    if (Math.abs(dx) > 5 && !d.moved) {
      d.moved = true;
      userTookOver();
    }
    if (d.moved) trackRef.current.scrollLeft = d.left - dx;
  };
  const endDrag = () => {
    if (drag.current.active) target.current = trackRef.current.scrollLeft;
    drag.current.active = false;
  };

  /* ---- klik na sliku: zaustavi šetnju, a zaustavljenu sliku uvećaj ---- */
  const onClickPiece = (i) => {
    if (drag.current.moved) {
      drag.current.moved = false;
      return;
    }
    if (playing) {
      setPlaying(false);
      goTo(i + 1);
      return;
    }
    if (current !== i + 1) {
      goTo(i + 1);
      return;
    }
    onOpenPhoto(i);
  };

  const togglePlay = () => {
    if (!playing && current >= lastStop) goTo(0);
    setPlaying(!playing);
  };

  const insta = person.links.find((l) => l.label === "Instagram");
  const shown = Math.min(Math.max(current, 1), total);

  return (
    <div className="expo" role="dialog" aria-modal="true" aria-label={t.ui("exhibitionEyebrow")}>
      <div className="expo__room" ref={roomRef} aria-hidden="true">
        <div className="expo__wall" />
        <div className="expo__floor" />
      </div>

      <header className="expo__top">
        <div className="expo__brand">
          <strong>{person.name}</strong>
          <span>{t.ui("exTitle")}</span>
        </div>
        <span className="expo__counter">
          {current === 0 ? "—" : String(shown).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        <button className="expo__exit" onClick={onClose}>
          {t.ui("exExit")} <span aria-hidden="true">✕</span>
        </button>
      </header>

      <div
        className="expo__track"
        ref={trackRef}
        tabIndex={-1}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
      >
        <section className="expo__panel expo__panel--intro" data-stop>
          <span className="expo__eyebrow">{t.ui("exhibitionEyebrow")}</span>
          <h2>{t.ui("exTitle")}</h2>
          <p className="expo__author">
            {person.name} · {t.ui("exSubtitle")}
          </p>
          <p>{t.ui("exIntro")}</p>
          <button
            className="btn"
            onClick={() => {
              setPlaying(true);
              goTo(1);
            }}
          >
            {t.ui("exStart")}
          </button>
        </section>

        {photos.map((ph, i) => (
          <figure className={`expo__piece ${current === i + 1 ? "is-current" : ""}`} data-stop key={i}>
            <div className="expo__lamp" />
            <div className="expo__glow" />
            <button
              className="expo__frame"
              onClick={() => onClickPiece(i)}
              aria-label={`${t.ui("open")}: ${ph.alt}`}
              style={{ cursor: playing || current !== i + 1 ? "pointer" : "zoom-in" }}
            >
              <span className="expo__mat">
                <Img src={ph.src} alt={ph.alt} draggable="false" />
              </span>
            </button>
            <figcaption className="expo__placard">
              <span className="expo__no">No. {ph.no}</span>
              <strong>{person.name}</strong>
              <span>{t.ui("exMedium")}</span>
            </figcaption>
          </figure>
        ))}

        <section className="expo__panel expo__panel--end" data-stop>
          <h2>{t.ui("exEndTitle")}</h2>
          <p>{t.ui("exEndText")}</p>
          <div className="expo__end-actions">
            {insta && (
              <a className="btn" href={insta.href} target="_blank" rel="noreferrer">
                @dsphotosd ↗
              </a>
            )}
            <button
              className="btn btn--ghost"
              onClick={() => {
                setPlaying(false);
                goTo(0);
              }}
            >
              {t.ui("exBack")}
            </button>
          </div>
        </section>
      </div>

      <div className="expo__controls">
        <button
          onClick={() => {
            userTookOver();
            goTo(current - 1);
          }}
          aria-label={t.ui("prev")}
          disabled={current === 0}
        >
          ←
        </button>
        <button className="expo__play" onClick={togglePlay} aria-label={playing ? t.ui("exPause") : t.ui("exPlay")}>
          {playing ? (
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor" />
              <rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path d="M8 5.5v13l11-6.5z" fill="currentColor" />
            </svg>
          )}
        </button>
        <div className="expo__progress" aria-hidden="true">
          <span style={{ transform: `scaleX(${progress})` }} />
        </div>
        <button
          onClick={() => {
            userTookOver();
            goTo(current + 1);
          }}
          aria-label={t.ui("next")}
          disabled={current === lastStop}
        >
          →
        </button>
      </div>
      <p className="expo__hint">{playing ? t.ui("exAuto") : t.ui("exHint")}</p>
    </div>
  );
}
