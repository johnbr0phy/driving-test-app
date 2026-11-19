"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  COUNTRY_COOKIE,
  CONSENT_COOKIE,
  GA_ID,
  REOPEN_CONSENT_EVENT,
  analyticsAllowed,
  needsConsentBanner,
  visitorCountryCookie,
  writeCookie,
} from "@/lib/privacyRegion";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Language } from "@/i18n";

// The banner's words in every site language, picked by the page's language
// (machine translation, like the other non-English copy).
const COPY: Record<Language, { ask: string; privacy: string; no: string; yes: string; label: string }> = {
  en: { ask: "May we use Google Analytics cookies to see which pages help people pass? Your progress works either way.", privacy: "Privacy policy", no: "No thanks", yes: "Allow", label: "Cookie choice" },
  es: { ask: "¿Podemos usar cookies de Google Analytics para ver qué páginas ayudan a aprobar? Tu progreso funciona igual en ambos casos.", privacy: "Política de privacidad", no: "No, gracias", yes: "Permitir", label: "Elección de cookies" },
  vi: { ask: "Chúng tôi có thể dùng cookie Google Analytics để xem trang nào giúp mọi người thi đậu không? Tiến độ của bạn vẫn hoạt động dù bạn chọn gì.", privacy: "Chính sách quyền riêng tư", no: "Không, cảm ơn", yes: "Cho phép", label: "Lựa chọn cookie" },
  ko: { ask: "어떤 페이지가 합격에 도움이 되는지 보기 위해 Google Analytics 쿠키를 사용해도 될까요? 어느 쪽을 선택해도 진행 상황은 그대로 유지됩니다.", privacy: "개인정보 처리방침", no: "괜찮아요", yes: "허용", label: "쿠키 선택" },
  zh: { ask: "我们可以使用 Google Analytics Cookie 来了解哪些页面帮助大家通过考试吗？无论怎么选，你的进度都不受影响。", privacy: "隐私政策", no: "不用了", yes: "允许", label: "Cookie 选择" },
  de: { ask: "Dürfen wir Google-Analytics-Cookies nutzen, um zu sehen, welche Seiten beim Bestehen helfen? Dein Fortschritt funktioniert so oder so.", privacy: "Datenschutzerklärung", no: "Nein, danke", yes: "Erlauben", label: "Cookie-Auswahl" },
  fr: { ask: "Pouvons-nous utiliser des cookies Google Analytics pour voir quelles pages aident à réussir ? Votre progression fonctionne dans tous les cas.", privacy: "Politique de confidentialité", no: "Non merci", yes: "Autoriser", label: "Choix des cookies" },
  it: { ask: "Possiamo usare i cookie di Google Analytics per vedere quali pagine aiutano a superare l'esame? I tuoi progressi funzionano in ogni caso.", privacy: "Informativa sulla privacy", no: "No, grazie", yes: "Consenti", label: "Scelta dei cookie" },
  pl: { ask: "Czy możemy używać plików cookie Google Analytics, aby sprawdzać, które strony pomagają zdać egzamin? Twoje postępy działają w obu przypadkach.", privacy: "Polityka prywatności", no: "Nie, dziękuję", yes: "Zezwól", label: "Wybór plików cookie" },
  nl: { ask: "Mogen we Google Analytics-cookies gebruiken om te zien welke pagina's mensen helpen slagen? Je voortgang werkt hoe dan ook.", privacy: "Privacybeleid", no: "Nee, bedankt", yes: "Toestaan", label: "Cookiekeuze" },
  pt: { ask: "Podemos usar cookies do Google Analytics para ver que páginas ajudam a passar? O seu progresso funciona em qualquer caso.", privacy: "Política de privacidade", no: "Não, obrigado", yes: "Permitir", label: "Escolha de cookies" },
  sv: { ask: "Får vi använda cookies från Google Analytics för att se vilka sidor som hjälper folk att klara provet? Dina framsteg fungerar oavsett.", privacy: "Integritetspolicy", no: "Nej tack", yes: "Tillåt", label: "Val av cookies" },
  da: { ask: "Må vi bruge Google Analytics-cookies til at se, hvilke sider der hjælper folk med at bestå? Dine fremskridt virker uanset hvad.", privacy: "Privatlivspolitik", no: "Nej tak", yes: "Tillad", label: "Valg af cookies" },
  fi: { ask: "Saammeko käyttää Google Analytics -evästeitä nähdäksemme, mitkä sivut auttavat läpäisemään kokeen? Edistymisesi toimii kummin päin tahansa.", privacy: "Tietosuojakäytäntö", no: "Ei kiitos", yes: "Salli", label: "Evästevalinta" },
  hu: { ask: "Használhatunk Google Analytics sütiket, hogy lássuk, mely oldalak segítenek a vizsgán? A haladásod így is, úgy is működik.", privacy: "Adatvédelmi irányelvek", no: "Köszönöm, nem", yes: "Engedélyezem", label: "Sütik kiválasztása" },
  ro: { ask: "Putem folosi cookie-uri Google Analytics ca să vedem ce pagini îi ajută pe oameni să promoveze? Progresul tău funcționează oricum.", privacy: "Politica de confidențialitate", no: "Nu, mulțumesc", yes: "Permit", label: "Alegerea cookie-urilor" },
  el: { ask: "Μπορούμε να χρησιμοποιούμε cookies του Google Analytics για να βλέπουμε ποιες σελίδες βοηθούν στην επιτυχία; Η πρόοδός σου λειτουργεί έτσι κι αλλιώς.", privacy: "Πολιτική απορρήτου", no: "Όχι, ευχαριστώ", yes: "Αποδοχή", label: "Επιλογή cookies" },
};

type GtagWindow = Window & { gtag?: (...args: unknown[]) => void } & Record<string, unknown>;

/**
 * Keeps Google Analytics' kill switch in step with lib/privacyRegion.ts as
 * the person moves around the site, learns the visitor's country once
 * (/api/geo), and shows the cookie banner to visitors in the EEA, the UK and
 * Switzerland until they choose. When analytics becomes allowed on a page
 * where it was off, the page view is sent then.
 */
export function AnalyticsConsent() {
  const pathname = usePathname() ?? "/";
  const [banner, setBanner] = useState(false);
  const enabled = useRef<boolean | null>(null);
  const { language } = useLanguage();
  const copy = COPY[language] ?? COPY.en;

  const apply = useCallback(() => {
    const w = window as unknown as GtagWindow;
    const allowed = analyticsAllowed(pathname);
    w[`ga-disable-${GA_ID}`] = !allowed;
    if (allowed && enabled.current === false && typeof w.gtag === "function") {
      w.gtag("config", GA_ID, { page_path: pathname });
    }
    enabled.current = allowed;
    setBanner(needsConsentBanner(pathname));
  }, [pathname]);

  useEffect(() => {
    if (enabled.current === null) {
      // The <head> script already decided for the first page.
      enabled.current = (window as unknown as GtagWindow)[`ga-disable-${GA_ID}`] !== true;
    }
    if (visitorCountryCookie()) {
      apply();
      return;
    }
    let cancelled = false;
    fetch("/api/geo")
      .then((r) => r.json())
      .then((d: { country?: string }) => {
        if (cancelled) return;
        writeCookie(COUNTRY_COOKIE, typeof d.country === "string" ? d.country : "ZZ");
        apply();
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [apply]);

  useEffect(() => {
    const reopen = () => setBanner(true);
    window.addEventListener(REOPEN_CONSENT_EVENT, reopen);
    return () => window.removeEventListener(REOPEN_CONSENT_EVENT, reopen);
  }, []);

  const choose = (value: "granted" | "denied") => {
    writeCookie(CONSENT_COOKIE, value);
    if (value === "denied") {
      // Drop the cookies GA set before, if any.
      for (const c of document.cookie.split("; ")) {
        const name = c.split("=")[0];
        if (name === "_ga" || name.startsWith("_ga_")) {
          for (const domain of ["", `; domain=${location.hostname}`, `; domain=.${location.hostname.replace(/^www\./, "")}`]) {
            document.cookie = `${name}=; path=/; max-age=0${domain}`;
          }
        }
      }
    }
    apply();
    setBanner(false);
  };

  if (!banner) return null;
  return (
    <div
      role="dialog"
      aria-label={copy.label}
      className="fixed inset-x-0 bottom-0 z-50 p-3 sm:p-4 pointer-events-none"
    >
      <div className="pointer-events-auto mx-auto max-w-xl rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-lg p-4 text-sm text-gray-700 dark:text-gray-200">
        <p>
          {copy.ask}{" "}
          <Link href="/privacy#cookies" className="underline">
            {copy.privacy}
          </Link>
        </p>
        <div className="mt-3 flex gap-2">
          <button
            type="button"
            onClick={() => choose("denied")}
            className="flex-1 rounded-lg border-2 border-gray-300 dark:border-gray-700 px-3 py-2 font-medium text-gray-900 dark:text-gray-50"
          >
            {copy.no}
          </button>
          <button
            type="button"
            onClick={() => choose("granted")}
            className="flex-1 rounded-lg border-2 border-gray-900 dark:border-white bg-gray-900 dark:bg-white px-3 py-2 font-medium text-white dark:text-gray-900"
          >
            {copy.yes}
          </button>
        </div>
      </div>
    </div>
  );
}

/** "Cookie settings" on /privacy: reopens the banner, for any visitor. */
export function CookieSettingsButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(REOPEN_CONSENT_EVENT))}
      className="underline text-brand-dark"
    >
      Change your cookie choice
    </button>
  );
}
