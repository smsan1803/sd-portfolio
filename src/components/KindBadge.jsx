import { useT } from "../i18n";

/* Oznaka vrste projekta: posao, klijent, osobni, edukacija */
export default function KindBadge({ kind }) {
  const t = useT();
  if (!kind) return null;
  return <span className={`kind kind--${kind}`}>{t.ui(`kind_${kind}`)}</span>;
}
