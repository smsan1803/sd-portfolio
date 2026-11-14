import { useEffect, useRef, useState, useCallback } from "react";
import Img from "./Img";
import { useT } from "../i18n";
import { person } from "../data";

/**
 * Kružna izložba: fotografije su obješene u krug oko posjetitelja i polagano kruže.
 * Povlačenje (mišem ili prstom) okreće krug s inercijom, strelice i kotačić idu
 * na sljedeću sliku, a klik na sliku sprijeda je otvara preko cijelog ekrana.
 */
const AUTO_SPEED = 7; // stupnjeva u sekundi dok krug sam kruži
const RESUME_AFTER = 4500; // nakon koliko ms mirovanja krug opet sam krene

const wrap = (a) => ((((a + 180) % 360) + 360) % 360) - 180;

export default function Exhibition({ photos, onClose, onOpenPhoto, paused }) {
  const t = useT();
  const total = photos.length;
  const step = 360 / total;

  const stageRef = useRef(null);
  const ringRef = useRef(null);
  const itemsRef = useRef([]);
  const progressRef = useRef(null);
  const sim = useRef({
    angle: 0,
    vel: 0,
    target: null,
    dragging: false,
    lastX: 0,
    lastT: 0,
    moved: 0,
    idleSince: 0,
  });
  const playingRef = useRef(true);
  const pausedRef = useRef(paused);
  const currentRef = useRef(0);
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [radius, setRadius] = useState(900);

  pausedRef.current = paused;
  playingRef.current = playing;

  /* ---- veličina kruga prema širini slika ---- */
  useEffect(() => {
    const measure = () => {
      const w = itemsRef.current[0]?.offsetWidth || 300;
      const gap = w * 0.22;
      setRadius(Math.round((w + gap) / 2 / Math.tan(Math.PI / total)));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [total]);

  /* ---- jedan motor za svo kretanje ---- */
  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let last = performance.now();
    const tick = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const s = sim.current;
      const holding = pausedRef.current;

      if (!s.dragging && !holding) {
        if (s.target !== null) {
          // mekano dolazak na odabranu sliku
          const k = 1 - Math.exp(-dt * 5.5);
          const d = s.target - s.angle;
          s.angle += d * k;
          s.vel = (d * k) / Math.max(dt, 0.001);
          if (Math.abs(d) < 0.02) {
            s.angle = s.target;
            s.target = null;
            s.vel = 0;
            s.idleSince = now;
          }
        } else {
          const auto = playingRef.current && !reduce ? -AUTO_SPEED : 0;
          // inercija se polako stapa u mirno kruženje
          s.vel += (auto - s.vel) * (1 - Math.exp(-dt * 1.6));
          s.angle += s.vel * dt;
          if (!playingRef.current && Math.abs(s.vel) < 0.6 && s.idleSince === 0) {
            // nakon inercije zaustavi se točno na najbližoj slici
            s.target = Math.round(s.angle / step) * step;
          }
        }
      }

      if (!playingRef.current && s.idleSince && now - s.idleSince > RESUME_AFTER && !holding && !reduce) {
        s.idleSince = 0;
        setPlaying(true);
      }

      render(s.angle);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [radius, step]);

  /* ---- iscrtavanje: krug + svjetlo na slikama ---- */
  const render = (angle) => {
    const ring = ringRef.current;
    if (!ring) return;
    ring.style.transform = `translateZ(${-radius}px) rotateY(${angle}deg)`;
    let best = 0;
    let bestD = 999;
    itemsRef.current.forEach((el, i) => {
      if (!el) return;
      const rel = wrap(i * step + angle);
      const d = Math.abs(rel);
      const light = Math.max(0, Math.cos((Math.min(d, 90) * Math.PI) / 180));
      el.style.opacity = (0.18 + light * 0.82).toFixed(3);
      el.style.setProperty("--light", light.toFixed(3));
      el.style.pointerEvents = d < 75 ? "auto" : "none";
      if (d < bestD) {
        bestD = d;
        best = i;
      }
    });
    if (best !== currentRef.current) {
      currentRef.current = best;
      setCurrent(best);
    }
    if (progressRef.current) progressRef.current.style.transform = `scaleX(${(best + 1) / total})`;
  };

  /* ---- upravljanje ---- */
  const stopAuto = () => {
    setPlaying(false);
    sim.current.idleSince = 0;
  };

  const goTo = useCallback(
    (i) => {
      const s = sim.current;
      stopAuto();
      // najkraći put do slike i
      const base = s.target ?? s.angle;
      const want = -i * step;
      s.target = base + wrap(want - base);
    },
    [step]
  );

  const next = () => goTo(currentRef.current + 1);
  const prev = () => goTo(currentRef.current - 1);

  const togglePlay = () => {
    const s = sim.current;
    s.target = null;
    s.idleSince = 0;
    setPlaying((p) => !p);
  };

  /* povlačenje mišem ili prstom */
  const onPointerDown = (e) => {
    const s = sim.current;
    s.dragging = true;
    s.target = null;
    s.moved = 0;
    s.lastX = e.clientX;
    s.lastT = performance.now();
    s.vel = 0;
    stopAuto();
    stageRef.current?.setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e) => {
    const s = sim.current;
    if (!s.dragging) return;
    const now = performance.now();
    const dx = e.clientX - s.lastX;
    const deg = (dx / Math.max(320, window.innerWidth)) * 110;
    s.angle += deg;
    s.moved += Math.abs(dx);
    const dt = Math.max(1, now - s.lastT) / 1000;
    s.vel = s.vel * 0.6 + (deg / dt) * 0.4;
    s.lastX = e.clientX;
    s.lastT = now;
  };
  const onPointerUp = () => {
    const s = sim.current;
    if (!s.dragging) return;
    s.dragging = false;
    s.vel = Math.max(-260, Math.min(260, s.vel));
  };

  /* kotačić */
  useEffect(() => {
    const stage = stageRef.current;
    let acc = 0;
    let timer = 0;
    const onWheel = (e) => {
      e.preventDefault();
      acc += Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      clearTimeout(timer);
      if (Math.abs(acc) > 40) {
        if (acc > 0) next();
        else prev();
        acc = 0;
      }
      timer = setTimeout(() => (acc = 0), 180);
    };
    stage.addEventListener("wheel", onWheel, { passive: false });
    return () => stage.removeEventListener("wheel", onWheel);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* tipkovnica i zaključavanje stranice ispod */
  useEffect(() => {
    if (paused) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      }
      if (e.key === " ") {
        e.preventDefault();
        togglePlay();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused, onClose]);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  const onClickPiece = (i) => {
    if (sim.current.moved > 6) return; // bilo je povlačenje, ne klik
    if (i === currentRef.current && sim.current.target === null && !playing) onOpenPhoto(i);
    else goTo(i);
  };

  const insta = person.links.find((l) => l.label === "Instagram");
  const ph = photos[current];

  return (
    <div className="expo expo--ring" role="dialog" aria-modal="true" aria-label={t.ui("exhibitionEyebrow")}>
      <div className="expo__room" aria-hidden="true">
        <div className="expo__wall" />
        <div className="expo__floor" />
      </div>

      <header className="expo__top">
        <div className="expo__brand">
          <strong>{person.name}</strong>
          <span>{t.ui("exTitle")}</span>
        </div>
        <span className="expo__counter">
          {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        <button className="expo__exit" onClick={onClose}>
          {t.ui("exExit")} <span aria-hidden="true">✕</span>
        </button>
      </header>

      <div
        className="ring__stage"
        ref={stageRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div className="ring" ref={ringRef}>
          {photos.map((p, i) => (
            <figure
              key={i}
              ref={(el) => (itemsRef.current[i] = el)}
              className={`ring__item ${current === i ? "is-current" : ""}`}
              style={{ transform: `rotateY(${i * step}deg) translateZ(${radius}px)` }}
            >
              <button
                className="ring__frame"
                onClick={() => onClickPiece(i)}
                aria-label={`${t.ui("open")}: ${p.alt}`}
                style={{ cursor: current === i && !playing ? "zoom-in" : "pointer" }}
              >
                <span className="ring__mat">
                  <Img src={p.src} alt={p.alt} draggable="false" />
                </span>
              </button>
            </figure>
          ))}
        </div>
      </div>

      <div className="ring__caption" aria-live="polite">
        <span className="expo__no">No. {ph?.no}</span>
        <strong>{person.name}</strong>
        <span>{t.ui("exMedium")}</span>
        {insta && (
          <a className="ring__insta" href={insta.href} target="_blank" rel="noreferrer">
            @dsphotosd ↗
          </a>
        )}
      </div>

      <div className="expo__controls">
        <button onClick={prev} aria-label={t.ui("prev")}>
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
          <span ref={progressRef} style={{ transform: `scaleX(${1 / total})` }} />
        </div>
        <button onClick={next} aria-label={t.ui("next")}>
          →
        </button>
      </div>
      <p className="expo__hint">{playing ? t.ui("exAuto") : t.ui("exHint")}</p>
    </div>
  );
}
