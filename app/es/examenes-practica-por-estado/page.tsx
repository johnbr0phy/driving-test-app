import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { states } from "@/data/states";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

export const metadata: Metadata = {
  title:
    "Exámenes de Práctica DMV por Estado 2026 - Gratis | TigerTest",
  description:
    "Exámenes de práctica DMV gratuitos para los 50 estados. Elige tu estado y empieza a practicar con 200 preguntas basadas en el manual de conducir de tu estado. Aprueba tu examen de permiso en el primer intento.",
  alternates: {
    canonical: `${siteUrl}/es/examenes-practica-por-estado`,
    languages: {
      en: `${siteUrl}/practice-tests-by-state`,
      es: `${siteUrl}/es/examenes-practica-por-estado`,
      "x-default": `${siteUrl}/practice-tests-by-state`,
    },
  },
  openGraph: {
    title: "Exámenes de Práctica DMV por Estado 2026 | TigerTest",
    description:
      "Exámenes de práctica DMV gratuitos para los 50 estados. 200 preguntas por estado con retroalimentación instantánea.",
    type: "website",
    locale: "es_US",
    url: `${siteUrl}/es/examenes-practica-por-estado`,
    images: [{ url: "/tiger.png", width: 512, height: 512 }],
  },
};

function groupStatesByLetter() {
  const groups: Record<string, typeof states> = {};
  for (const state of states) {
    const letter = state.name[0];
    if (!groups[letter]) groups[letter] = [];
    groups[letter].push(state);
  }
  return groups;
}

export default function SpanishPracticeTestsByStatePage() {
  const grouped = groupStatesByLetter();
  const letters = Object.keys(grouped).sort();

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Inicio",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Exámenes de Práctica por Estado",
        item: `${siteUrl}/es/examenes-practica-por-estado`,
      },
    ],
  };

  return (
    <div className="flex-1 bg-white relative">
      <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-brand-light to-white pointer-events-none" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="relative container mx-auto px-4 py-8 md:py-12 max-w-5xl">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1">
            <li>
              <Link href="/" className="hover:text-brand">
                Inicio
              </Link>
            </li>
            <li>
              <ChevronRight className="h-3 w-3 inline" />
            </li>
            <li className="text-gray-900 font-medium">
              Exámenes de Práctica por Estado
            </li>
          </ol>
        </nav>

        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Exámenes de Práctica DMV por Estado
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Elige tu estado a continuación para acceder a preguntas de práctica
            gratuitas basadas en el manual oficial de conducir de tu estado.
            Los 50 estados más Washington D.C. están cubiertos.
          </p>
        </div>

        {/* State Grid */}
        <div className="space-y-8 mb-16">
          {letters.map((letter) => (
            <div key={letter}>
              <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-200 pb-2">
                {letter}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {grouped[letter].map((state) => (
                  <Link
                    key={state.slug}
                    href={`/es/${state.slug}-examen-practica-dmv`}
                    className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg p-3 hover:border-brand-border hover:bg-brand-light transition-colors group"
                  >
                    <div>
                      <span className="font-medium text-gray-900 group-hover:text-brand-dark">
                        {state.name}
                      </span>
                      <span className="text-sm text-gray-500 ml-2">
                        {state.writtenTestQuestions}p &middot;{" "}
                        {state.passingScore}%
                      </span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-brand" />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Summary Section */}
        <div className="bg-gray-50 rounded-2xl p-6 md:p-8 mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Sobre los Exámenes de Práctica por Estado de TigerTest
          </h2>
          <div className="text-gray-600 space-y-3">
            <p>
              Cada estado tiene diferentes leyes de tránsito, formatos de examen
              y requisitos para aprobar. TigerTest ofrece{" "}
              <strong>200 preguntas por estado</strong>, incluyendo preguntas
              específicas sobre leyes de tránsito locales, límites de velocidad
              y regulaciones únicas de tu estado.
            </p>
            <p>
              Cada examen de práctica refleja el formato del examen escrito real
              del DMV de tu estado. Estudia en modo entrenamiento en tu teléfono
              para práctica rápida, luego toma exámenes completos de 50
              preguntas cuando estés listo para simular el examen real.
            </p>
            <p>
              Todos los exámenes de práctica son{" "}
              <strong>gratuitos para empezar</strong> sin necesidad de crear una
              cuenta. Sigue tu progreso, ve explicaciones detalladas y gana
              confianza antes del día del examen.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
