import { useEffect, useRef, useState } from 'react';
import { THEMES, DEFAULT_THEME, STORAGE_KEY, isThemeId, type ThemeId } from '../data/themes';

/**
 * Monokai Pro filter picker. The applied theme is read back off the document
 * rather than kept as the source of truth here — the inline bootstrap script in
 * BaseLayout has already set it before React hydrates, and re-deriving avoids a
 * flash of the default palette on load.
 */
export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<ThemeId>(DEFAULT_THEME);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const applied = document.documentElement.dataset.theme;
    if (isThemeId(applied)) setTheme(applied);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const apply = (next: ThemeId) => {
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Private browsing or blocked storage — the theme still applies for this page.
    }
    setTheme(next);
    setOpen(false);
  };

  const active = THEMES.find((t) => t.id === theme) ?? THEMES[0];

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Colour theme: Monokai Pro ${active.name}. Change theme`}
        className="flex items-center gap-2 rounded-lg border px-2.5 py-1.5 text-xs font-medium
                   text-[var(--c-text-dim)] hover:text-[var(--c-text)]
                   hover:border-[var(--c-border-strong)] cursor-pointer"
        style={{ borderColor: 'var(--c-border)', background: 'var(--c-surface)' }}
      >
        <span className="flex" aria-hidden="true">
          {active.swatch.slice(1).map((c, i) => (
            <span
              key={c + i}
              className="h-3 w-3 rounded-full ring-1"
              style={{
                background: c,
                marginLeft: i === 0 ? 0 : '-0.3rem',
                // @ts-expect-error -- CSS custom property passthrough
                '--tw-ring-color': 'var(--c-surface)',
              }}
            />
          ))}
        </span>
        <span className="hidden sm:inline font-mono">{active.name}</span>
        <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true" className="opacity-60">
          <path d="M1 3l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      {open && (
        <div
          role="listbox"
          aria-label="Monokai Pro filters"
          className="absolute right-0 z-50 mt-2 w-60 overflow-hidden rounded-xl border p-1.5 shadow-2xl"
          style={{ borderColor: 'var(--c-border-strong)', background: 'var(--c-surface)' }}
        >
          <p
            className="px-2.5 pt-1.5 pb-2 font-mono text-[0.65rem] uppercase tracking-[0.14em]"
            style={{ color: 'var(--c-text-faint)' }}
          >
            Monokai Pro filters
          </p>

          {THEMES.map((t) => {
            const selected = t.id === theme;
            return (
              <button
                key={t.id}
                type="button"
                role="option"
                aria-selected={selected}
                onClick={() => apply(t.id)}
                className="flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-left text-sm cursor-pointer"
                style={{
                  background: selected ? 'var(--c-bg-deep)' : 'transparent',
                  color: selected ? 'var(--c-text)' : 'var(--c-text-dim)',
                }}
                onMouseEnter={(e) => {
                  if (!selected) e.currentTarget.style.background = 'var(--c-bg-deep)';
                }}
                onMouseLeave={(e) => {
                  if (!selected) e.currentTarget.style.background = 'transparent';
                }}
              >
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md ring-1"
                  style={{ background: t.swatch[0], borderColor: 'var(--c-border)' }}
                >
                  <span className="flex gap-[2px]">
                    {t.swatch.slice(1).map((c) => (
                      <span key={c} className="h-2.5 w-[3px] rounded-full" style={{ background: c }} />
                    ))}
                  </span>
                </span>

                <span className="flex-1">
                  <span className="block font-medium">{t.name}</span>
                  <span className="block font-mono text-[0.65rem]" style={{ color: 'var(--c-text-faint)' }}>
                    {t.mode}
                  </span>
                </span>

                {selected && (
                  <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" style={{ color: 'var(--c-accent)' }}>
                    <path d="M2 7.5l3.5 3.5L12 4" fill="none" stroke="currentColor" strokeWidth="2"
                      strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
