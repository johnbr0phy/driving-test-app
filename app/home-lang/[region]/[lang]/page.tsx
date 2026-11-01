import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HomePage } from "@/components/home/HomePage";
import { isHomeLanguage } from "@/lib/homeLanguages";
import { isRegion, regionHomePath, regionInfo } from "@/lib/region";

// A country homepage in a language other than its own, for someone who picked
// that language (lib/language.ts). middleware.ts rewrites "/", /uk, /de... here
// when the tt-lang cookie asks for it, so the address bar keeps the country's
// URL. Crawlers carry no cookie and only ever see the country's own page, so
// this route is noindex with the country page as canonical.
export const revalidate = 3600;
export const dynamicParams = true;
export function generateStaticParams() {
  return [];
}

type Params = { region: string; lang: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { region } = await params;
  const path = isRegion(region) ? regionHomePath(region) : "/";
  return { robots: { index: false, follow: true }, alternates: { canonical: path } };
}

export default async function HomeInLanguage({ params }: { params: Promise<Params> }) {
  const { region, lang } = await params;
  if (!isRegion(region) || !isHomeLanguage(lang) || lang === regionInfo(region).lang) notFound();
  return <HomePage region={region} lang={lang} />;
}
