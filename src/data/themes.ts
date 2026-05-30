export type ThemeId =
  | 'classic'
  | 'octagon'
  | 'machine'
  | 'ristretto'
  | 'spectrum'
  | 'pacific';

export interface ThemeMeta {
  id: ThemeId;
  /** Label as Monokai Pro names the filter. */
  name: string;
  mode: 'dark' | 'light';
  /** Swatch shown in the picker: [background, accent1, accent3, accent4]. */
  swatch: [string, string, string, string];
}

export const THEMES: ThemeMeta[] = [
  { id: 'classic',   name: 'Classic',   mode: 'dark',  swatch: ['#2d2a2e', '#ff6188', '#ffd866', '#a9dc76'] },
  { id: 'octagon',   name: 'Octagon',   mode: 'dark',  swatch: ['#282a3a', '#ff657a', '#ffd76d', '#bad761'] },
  { id: 'machine',   name: 'Machine',   mode: 'dark',  swatch: ['#273136', '#ff6d7e', '#ffed72', '#a2e57b'] },
  { id: 'ristretto', name: 'Ristretto', mode: 'dark',  swatch: ['#2c2525', '#fd6883', '#f9cc6c', '#adda78'] },
  { id: 'spectrum',  name: 'Spectrum',  mode: 'dark',  swatch: ['#222222', '#fc618d', '#fce566', '#7bd88f'] },
  { id: 'pacific',   name: 'Pacific',   mode: 'dark',  swatch: ['#293136', '#ff6d7e', '#ffed72', '#6bd66b'] },
];

export const DEFAULT_THEME: ThemeId = 'classic';
export const STORAGE_KEY = 'ab-theme';

export const isThemeId = (value: unknown): value is ThemeId =>
  typeof value === 'string' && THEMES.some((t) => t.id === value);
