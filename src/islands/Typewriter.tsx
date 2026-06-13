import { useEffect, useState } from 'react';

interface Props {
  phrases: readonly string[];
  typeMs?: number;
  deleteMs?: number;
  holdMs?: number;
}

/** Cycles the hero subtitle. Respects prefers-reduced-motion by holding the first phrase. */
export default function Typewriter({ phrases, typeMs = 55, deleteMs = 28, holdMs = 1900 }: Props) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [still, setStill] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (query.matches) {
      setStill(true);
      setText(phrases[0] ?? '');
    }
  }, [phrases]);

  useEffect(() => {
    if (still) return;

    const current = phrases[index % phrases.length] ?? '';

    if (!deleting && text === current) {
      const t = setTimeout(() => setDeleting(true), holdMs);
      return () => clearTimeout(t);
    }

    if (deleting && text === '') {
      setDeleting(false);
      setIndex((i) => (i + 1) % phrases.length);
      return;
    }

    const t = setTimeout(
      () => setText(deleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1)),
      deleting ? deleteMs : typeMs,
    );
    return () => clearTimeout(t);
  }, [text, deleting, index, phrases, still, typeMs, deleteMs, holdMs]);

  return (
    <span>
      <span style={{ color: 'var(--c-accent)' }}>{text}</span>
      {!still && <span className="caret" aria-hidden="true">&nbsp;</span>}
    </span>
  );
}
