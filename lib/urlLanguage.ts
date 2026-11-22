// The language a URL is written in, for pages whose URL says so: the DMV and
// translated landings under /es, /vi, /ko, /zh and /pt, and the German /de pages.
// The root layout serves <html lang="en"> for every page (one root layout),
// so this fixes the language before anything renders: next.config.ts sends it
// as a Content-Language header, and URL_LANG_INIT_SCRIPT sets <html lang>
// before first paint for screen readers and rendering crawlers.
// contexts/LanguageContext.tsx keeps it while the person browses: such a
// page's content is in its URL's language even when the header and footer
// follow the person's own (lib/pageLanguage.ts). A country homepage (/es, /fi...) is
// in its country's language by default but can be shown in the language the person
// picked, so the prefixes below cover only the pages under it; the homepage itself
// gets its Content-Language header from COUNTRY_HOME_LANGUAGES.

export const URL_LANGUAGE_PREFIXES: { prefix: string; lang: string; includeRoot: boolean }[] = [
  { prefix: "/es", lang: "es", includeRoot: false },
  { prefix: "/pt", lang: "pt", includeRoot: false },
  { prefix: "/vi", lang: "vi", includeRoot: false },
  { prefix: "/ko", lang: "ko", includeRoot: false },
  { prefix: "/zh", lang: "zh-Hans", includeRoot: false },
  { prefix: "/de", lang: "de", includeRoot: true },
  { prefix: "/it", lang: "it", includeRoot: true },
  { prefix: "/sv", lang: "sv", includeRoot: false },
  { prefix: "/da", lang: "da", includeRoot: false },
  { prefix: "/fi", lang: "fi", includeRoot: false },
  { prefix: "/hu", lang: "hu", includeRoot: false },
  { prefix: "/ro", lang: "ro", includeRoot: false },
  { prefix: "/el", lang: "el", includeRoot: false },
  { prefix: "/nl", lang: "nl", includeRoot: false },
  { prefix: "/fr", lang: "fr", includeRoot: true },
  { prefix: "/pl", lang: "pl", includeRoot: true },
];

/** The language `pathname` is written in, or null for an ordinary page. */
export function urlLanguage(pathname: string | null | undefined): string | null {
  if (!pathname) return null;
  const hit = URL_LANGUAGE_PREFIXES.find(
    ({ prefix }) => pathname.startsWith(`${prefix}/`)
  );
  return hit?.lang ?? null;
}

/** next.config.ts headers(): Content-Language on every page written in another language,
 *  and on a country homepage whose default language is not English (what crawlers get). */
export function urlLanguageHeaders() {
  const roots = new Set(URL_LANGUAGE_PREFIXES.filter((p) => p.includeRoot).map((p) => p.prefix));
  return [
    ...URL_LANGUAGE_PREFIXES.flatMap(({ prefix, lang, includeRoot }) => [
      ...(includeRoot ? [{ source: prefix, headers: [{ key: "Content-Language", value: lang }] }] : []),
      { source: `${prefix}/:path+`, headers: [{ key: "Content-Language", value: lang }] },
    ]),
    ...COUNTRY_HOME_LANGUAGES.filter(({ path }) => !roots.has(path)).map(({ path, lang }) => ({
      source: path,
      headers: [{ key: "Content-Language", value: lang }],
    })),
  ];
}

/** Every country homepage written in a language other than English (REGIONS[].lang in
 *  lib/region.ts, kept in step by tests/url-language.test.cjs). Only the page itself: the
 *  pages under /es or /pt are covered above, and /se, /dk, /gr, /be have no pages under them.
 *  Kept here rather than read from lib/region.ts because next.config.ts imports this file. */
export const COUNTRY_HOME_LANGUAGES: { path: string; lang: string }[] = [
  { path: "/es", lang: "es" },
  { path: "/pt", lang: "pt" },
  { path: "/ro", lang: "ro" },
  { path: "/se", lang: "sv" },
  { path: "/gr", lang: "el" },
  { path: "/dk", lang: "da" },
  { path: "/hu", lang: "hu" },
  { path: "/be", lang: "nl" },
  { path: "/fi", lang: "fi" },
  { path: "/de", lang: "de" },
  { path: "/it", lang: "it" },
  { path: "/fr", lang: "fr" },
  { path: "/pl", lang: "pl" },
  { path: "/nl", lang: "nl" },
];

// The pages under a prefix only: a country homepage (/de) can be shown in
// the language the person picked, which LanguageContext applies.
export const URL_LANG_INIT_SCRIPT = `(function(){try{var p=location.pathname,r=${JSON.stringify(
  URL_LANGUAGE_PREFIXES.map(({ prefix, lang }) => [prefix, lang])
)};for(var i=0;i<r.length;i++){if(p.indexOf(r[i][0]+"/")===0){document.documentElement.lang=r[i][1];break;}}}catch(e){}})();`;
