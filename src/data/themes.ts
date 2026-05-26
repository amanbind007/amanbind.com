export type ThemeId = 'classic';

export interface ThemeMeta {
  id: ThemeId;
  /** Label as Monokai Pro names the filter. */
  name: string;
  mode: 'dark' | 'light';
  /** Swatch shown in the picker: [background, accent1, accent3, accent4]. */
  swatch: [string, string, string, string];
}

export const THEMES: ThemeMeta[] = [
  { id: 'classic', name: 'Classic', mode: 'dark', swatch: ['#2d2a2e', '#ff6188', '#ffd866', '#a9dc76'] },
];

export const DEFAULT_THEME: ThemeId = 'classic';
export const STORAGE_KEY = 'ab-theme';

export const isThemeId = (value: unknown): value is ThemeId =>
  typeof value === 'string' && THEMES.some((t) => t.id === value);
