export const LOCALES = ['en', 'es', 'de', 'fr'] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';

export const LOCALE_LABELS: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
  de: 'Deutsch',
  fr: 'Français',
};

// English lives at the root because those URLs are already indexed; only the
// other locales take a prefix.
export function localePath(locale: Locale, path: string): string {
  const clean = path === '/' ? '' : path.replace(/^\//, '');
  if (locale === DEFAULT_LOCALE) return clean ? `/${clean}` : '/';
  return clean ? `/${locale}/${clean}` : `/${locale}`;
}

// getStaticPaths entries for a page that exists in every locale.
export function localeParams() {
  return LOCALES.map((locale) => ({
    params: { lang: locale === DEFAULT_LOCALE ? undefined : locale },
    props: { locale },
  }));
}

// hreflang set for a given page, e.g. alternatesFor('/services').
export function alternatesFor(path: string) {
  return [
    ...LOCALES.map((l) => ({ lang: l, path: localePath(l, path) })),
    { lang: 'x-default', path: localePath(DEFAULT_LOCALE, path) },
  ];
}
