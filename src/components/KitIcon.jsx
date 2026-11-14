// Linijske ilustracije opreme za mini foto studio.
// Ako stavka opreme ima pravu fotografiju (photo), prikazuje se fotografija umjesto ilustracije.
const S = { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" };

const ICONS = {
  // softbox na stalku
  light: (
    <>
      <path {...S} d="M14 10h28l-4 22H18z" />
      <path {...S} d="M20 16h16" opacity=".45" />
      <path {...S} d="M28 32v20M28 52l-10 8M28 52l10 8M28 52v8" />
      <circle cx="28" cy="21" r="3" fill="var(--accent)" />
      <path {...S} d="M46 14l6-3M47 21h7M46 28l6 3" stroke="var(--accent)" />
    </>
  ),
  // platno na stalku s dvije noge
  backdrop: (
    <>
      <path {...S} d="M8 8h48" />
      <path {...S} d="M12 8v52M52 8v52M8 60h8M48 60h8" />
      <path {...S} d="M16 10v30c0 8 6 14 16 16 10-2 16-8 16-16V10" />
      <path d="M17 11h30v29c0 7-6 13-15 15-9-2-15-8-15-15z" fill="var(--accent)" opacity=".16" />
    </>
  ),
  // rotacijska platforma s proizvodom i strelicom
  turntable: (
    <>
      <ellipse {...S} cx="32" cy="46" rx="22" ry="7" />
      <path {...S} d="M10 46v4c0 4 10 7 22 7s22-3 22-7v-4" />
      <rect {...S} x="25" y="22" width="14" height="22" rx="2" />
      <path {...S} d="M12 30c4-10 12-15 20-15s16 5 20 15" stroke="var(--accent)" />
      <path {...S} d="M48 24l4 6-7 1" stroke="var(--accent)" />
    </>
  ),
  // foto box (svjetlosni šator) 40 × 40
  box: (
    <>
      <path {...S} d="M10 20l22-10 22 10v26L32 56 10 46z" />
      <path {...S} d="M10 20l22 10 22-10M32 30v26" />
      <path d="M33 31l20-9v23L33 54z" fill="var(--accent)" opacity=".14" />
      <circle cx="21" cy="40" r="4" fill="var(--accent)" />
      <path {...S} d="M14 12l3 3M24 6v4" opacity=".5" />
    </>
  ),
};

export default function KitIcon({ name }) {
  return (
    <svg viewBox="0 0 64 64" width="56" height="56" aria-hidden="true">
      {ICONS[name] || ICONS.box}
    </svg>
  );
}
