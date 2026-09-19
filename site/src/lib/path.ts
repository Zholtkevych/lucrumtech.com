// With build.format:'file', Astro.url.pathname carries the .html extension at
// build time (/services.html) while the URL actually served is extensionless.
// Anything comparing or publishing a path has to normalise first, or it silently
// stops matching in the build while still working in dev.
export function cleanPath(pathname: string): string {
  return pathname.replace(/index\.html$/, '').replace(/\.html$/, '') || '/';
}
