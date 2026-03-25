"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "@/contexts/LanguageContext";
import { states } from "@/data/states";

const popularStateSlugs = [
  "california", "texas", "florida", "new-york", "pennsylvania",
  "illinois", "ohio", "georgia", "north-carolina", "michigan",
  "new-jersey", "virginia", "washington", "arizona", "massachusetts",
];

const popularStates = popularStateSlugs
  .map((slug) => states.find((s) => s.slug === slug))
  .filter(Boolean);

export function Footer() {
  const { t, language } = useTranslation();
  const pathname = usePathname();
  const isEs = language === "es";
  const isCDL = pathname?.startsWith("/cdl") || pathname === "/cdl-practice-test";

  const dataTheme = isCDL ? "cdl" : undefined;

  return (
    <footer className="border-t bg-white mt-auto" data-theme={dataTheme}>
      <div className="container mx-auto px-4 py-6">
        {!isCDL && (
          <div className="flex flex-wrap justify-center md:justify-between gap-x-3 gap-y-1 text-sm text-gray-500">
            {popularStates.map(
              (state) =>
                state && (
                  <Link
                    key={state.slug}
                    href={
                      isEs
                        ? `/es/${state.slug}-examen-practica-dmv`
                        : `/${state.slug}-dmv-practice-test`
                    }
                    className="hover:text-brand"
                  >
                    {state.name}
                  </Link>
                )
            )}
            <Link
              href={
                isEs
                  ? "/es/examenes-practica-por-estado"
                  : "/practice-tests-by-state"
              }
              className="text-brand hover:text-brand-dark font-medium"
            >
              {t("footer.allStates")}
            </Link>
          </div>
        )}
        <div className={`flex flex-col md:flex-row md:items-center md:justify-between gap-2 text-sm text-gray-600 ${isCDL ? "" : "mt-4"}`}>
          <p className="text-center md:text-left">
            {t("footer.madeWith")}{" "}
            <span className="text-red-500" aria-label="love">
              ❤️
            </span>{" "}
            {t("footer.by")}{" "}
            <a
              href="https://x.com/JohnBr0"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand hover:text-brand-dark font-medium hover:underline"
            >
              @JohnBr0
            </a>
            .
          </p>
          <div className="flex justify-center md:justify-end gap-x-4 text-gray-500">
            <Link href="/schools" className="hover:text-brand hover:underline">
              Driving Schools
            </Link>
            <Link href="/privacy" className="hover:text-brand hover:underline">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
