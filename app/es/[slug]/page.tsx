import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  CheckCircle2,
  FileText,
  Target,
  Clock,
  BookOpen,
  AlertCircle,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import { states, getStateBySlug } from "@/data/states";
import { getStateLandingInfoEs } from "@/data/stateLandingDataEs";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

// Mirrors the English state page so AI engines see a consistent publish date
// across language variants.
const STATE_PAGE_PUBLISHED_AT = "2026-03-13";

interface PageProps {
  params: Promise<{ slug: string }>;
}

function parseStateSlug(slug: string): string | null {
  const match = slug.match(/^(.+)-examen-practica-dmv$/);
  return match ? match[1] : null;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return states.map((state) => ({
    slug: `${state.slug}-examen-practica-dmv`,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const stateSlug = parseStateSlug(slug);
  const state = stateSlug ? getStateBySlug(stateSlug) : undefined;

  if (!state) {
    return { title: "Estado No Encontrado" };
  }

  const title = `Examen de Práctica DMV de ${state.name} 2026 - Gratis | TigerTest`;
  const description = `Aprueba tu examen de permiso de ${state.name} en el primer intento. ${state.writtenTestQuestions} preguntas de práctica gratuitas basadas en el manual de conducir de ${state.name}. Empieza a practicar ahora.`;
  const canonicalUrl = `${siteUrl}/es/${state.slug}-examen-practica-dmv`;
  const enUrl = `${siteUrl}/${state.slug}-dmv-practice-test`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "en": enUrl,
        "es": canonicalUrl,
        "x-default": enUrl,
      },
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: canonicalUrl,
      locale: "es_US",
      siteName: "TigerTest",
      images: [
        {
          url: "/tiger.png",
          width: 512,
          height: 512,
          alt: `Examen de Práctica DMV de ${state.name} - TigerTest`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/tiger.png"],
    },
  };
}

export default async function SpanishStateDMVPage({ params }: PageProps) {
  const { slug } = await params;
  const stateSlug = parseStateSlug(slug);
  const state = stateSlug ? getStateBySlug(stateSlug) : undefined;

  if (!state) {
    notFound();
  }

  const landingInfo = getStateLandingInfoEs(state.code);
  if (!landingInfo) {
    notFound();
  }

  const rawPassing = Math.ceil(
    (state.writtenTestQuestions * state.passingScore) / 100
  );

  const neighboringStates = landingInfo.neighboringSlugs
    .map((s) => getStateBySlug(s))
    .filter(Boolean);

  // FAQ data in Spanish
  const faqItems = [
    {
      question: `¿Cuántas preguntas tiene el examen de permiso de ${state.name}?`,
      answer: `El examen escrito de conocimientos del ${state.dmvName} de ${state.name} tiene ${state.writtenTestQuestions} preguntas. Necesitas responder correctamente al menos ${rawPassing} (${state.passingScore}%) para aprobar. TigerTest ofrece 200 preguntas de práctica para prepararte a fondo.`,
    },
    {
      question: `¿Qué calificación necesito para aprobar el examen del DMV de ${state.name}?`,
      answer: `Necesitas una calificación de ${state.passingScore}% o más para aprobar el examen escrito del ${state.dmvName} de ${state.name}. Eso significa responder correctamente al menos ${rawPassing} de ${state.writtenTestQuestions} preguntas.`,
    },
    {
      question: `¿Puedo tomar el examen de permiso de ${state.name} en línea?`,
      answer: landingInfo.onlineTestInfo,
    },
    {
      question: `¿Qué edad debo tener para obtener un permiso de aprendiz en ${state.name}?`,
      answer: `En ${state.name}, puedes solicitar un permiso de aprendiz a los ${state.minPermitAge} años. Debes aprobar el examen escrito de conocimientos y un examen de visión para recibir tu permiso.`,
    },
    {
      question: `¿Qué pasa si repruebo el examen de permiso de ${state.name}?`,
      answer: landingInfo.retakeInfo,
    },
  ];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

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
      {
        "@type": "ListItem",
        position: 3,
        name: `Examen de Práctica DMV de ${state.name}`,
        item: `${siteUrl}/es/${state.slug}-examen-practica-dmv`,
      },
    ],
  };

  // Build-time timestamp; baked into the static page on each deploy.
  const lastModifiedIso = new Date().toISOString();

  // JSON-LD: WebApplication / LearningResource — mirrors the English page so
  // Spanish results are equally citable in AI answers.
  const courseJsonLd = {
    "@context": "https://schema.org",
    "@type": ["WebApplication", "LearningResource"],
    name: `Examen de Práctica DMV de ${state.name} - TigerTest`,
    description: `Examen de práctica gratuito del DMV de ${state.name} con 200 preguntas basadas en el manual oficial de conducir del ${state.dmvName} de ${state.name}.`,
    url: `${siteUrl}/es/${state.slug}-examen-practica-dmv`,
    inLanguage: "es-US",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Any",
    educationalLevel: "Beginner",
    learningResourceType: "Practice test",
    teaches: `Material del examen escrito de conocimientos del DMV de ${state.name}`,
    datePublished: STATE_PAGE_PUBLISHED_AT,
    dateModified: lastModifiedIso,
    author: {
      "@type": "Organization",
      name: "TigerTest",
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "TigerTest",
      url: siteUrl,
      logo: `${siteUrl}/tiger.png`,
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  // JSON-LD: HowTo — targets "cómo aprobar el examen del DMV de [estado]" queries.
  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `Cómo Aprobar el Examen de Permiso del DMV de ${state.name}`,
    description: `Guía paso a paso para aprobar el examen escrito de conocimientos del ${state.dmvName} de ${state.name} en tu primer intento.`,
    totalTime: "PT2H",
    estimatedCost: {
      "@type": "MonetaryAmount",
      currency: "USD",
      value: "0",
    },
    supply: [
      { "@type": "HowToSupply", name: `${landingInfo.handbookName}` },
      { "@type": "HowToSupply", name: "Preguntas de práctica de TigerTest" },
    ],
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Lee el manual oficial del conductor",
        text: `Descarga y lee el ${landingInfo.handbookName}. Cada pregunta del examen de permiso de ${state.name} proviene de este manual.`,
        url: landingInfo.handbookUrl,
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Practica en el modo de entrenamiento",
        text: `Repasa las 200 preguntas de práctica específicas de ${state.name} de TigerTest una por una, con retroalimentación instantánea y explicaciones para cada respuesta.`,
        url: `${siteUrl}/es/${state.slug}-examen-practica-dmv`,
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Toma un examen de práctica completo y cronometrado",
        text: `Simula el examen real con un examen de práctica de 50 preguntas. El examen del ${state.dmvName} de ${state.name} requiere ${state.passingScore}% (${rawPassing} de ${state.writtenTestQuestions}) para aprobar.`,
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Repasa cada respuesta incorrecta",
        text: "Vuelve a leer la explicación de cualquier pregunta que falles. TigerTest pone en cola las preguntas falladas para repetición espaciada, para que las estudies con más frecuencia.",
      },
      {
        "@type": "HowToStep",
        position: 5,
        name: `Agenda tu cita en el ${state.dmvName} de ${state.name}`,
        text: `Cuando estés obteniendo constantemente más del ${state.passingScore}% en la práctica, reserva tu examen presencial del ${state.dmvName}. Lleva la identificación requerida, comprobante de domicilio y la tarifa de solicitud.`,
      },
    ],
  };

  const testimonials = [
    {
      quote: "Usé esto para estudiar. ¡Aprobé hoy! Gracias :)",
      author: "Naive_Usual1910",
    },
    {
      quote: "aprobé en siete minutos",
      author: "vivacious-vi",
    },
    {
      quote: "realmente me ayudó a prepararme, y aprobé mi examen hoy",
      author: "Big-Burrito-8765",
    },
    {
      quote: "me sentí seguro después de estudiar solo el día anterior",
      author: "JayjayX12",
    },
    {
      quote: "aprobé en 3 minutos",
      author: "Curdled_Cave",
    },
    {
      quote: "ayudó mucho",
      author: "WorthEducational523",
    },
  ];

  return (
    <div className="flex-1 bg-white relative">
      <div className="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-brand-light to-white pointer-events-none" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />

      <div className="relative container mx-auto px-4 py-8 md:py-12 max-w-4xl">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1 flex-wrap">
            <li>
              <Link href="/" className="hover:text-brand">
                Inicio
              </Link>
            </li>
            <li>
              <ChevronRight className="h-3 w-3 inline" />
            </li>
            <li>
              <Link
                href="/es/examenes-practica-por-estado"
                className="hover:text-brand"
              >
                Exámenes por Estado
              </Link>
            </li>
            <li>
              <ChevronRight className="h-3 w-3 inline" />
            </li>
            <li className="text-gray-900 font-medium">{state.name}</li>
          </ol>
        </nav>

        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Examen de Práctica DMV Gratis de {state.name} 2026
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Aprueba tu examen de permiso del {state.dmvName} de {state.name} en
            el primer intento. Practica con 200 preguntas específicas de{" "}
            {state.name} basadas en el manual oficial de conducir.
          </p>
          <Link href={`/signup?state=${state.code}`}>
            <Button
              size="lg"
              className="text-lg px-8 py-6 bg-gray-900 text-white hover:bg-gray-800 font-bold rounded-xl"
            >
              Empezar a Practicar Gratis
            </Button>
          </Link>
        </div>

        {/* State Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <Card className="bg-gradient-to-br from-brand-light to-brand-gradient-to border-brand-border-light">
            <CardContent className="p-4 md:p-6 text-center">
              <FileText className="h-6 w-6 md:h-8 md:w-8 text-brand mx-auto mb-2" />
              <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                {state.writtenTestQuestions}
              </div>
              <div className="text-sm text-gray-600">Preguntas en el Examen</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-brand-light to-brand-gradient-to border-brand-border-light">
            <CardContent className="p-4 md:p-6 text-center">
              <Target className="h-6 w-6 md:h-8 md:w-8 text-brand mx-auto mb-2" />
              <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                {state.passingScore}%
              </div>
              <div className="text-sm text-gray-600">Calificación para Aprobar</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-brand-light to-brand-gradient-to border-brand-border-light">
            <CardContent className="p-4 md:p-6 text-center">
              <Clock className="h-6 w-6 md:h-8 md:w-8 text-brand mx-auto mb-2" />
              <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                {state.minPermitAge}
              </div>
              <div className="text-sm text-gray-600">Edad Mín. para Permiso</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-brand-light to-brand-gradient-to border-brand-border-light">
            <CardContent className="p-4 md:p-6 text-center">
              <AlertCircle className="h-6 w-6 md:h-8 md:w-8 text-brand mx-auto mb-2" />
              <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                {rawPassing}/{state.writtenTestQuestions}
              </div>
              <div className="text-sm text-gray-600">Correctas para Aprobar</div>
            </CardContent>
          </Card>
        </div>

        {/* State-Specific Content Section */}
        <Card className="mb-12">
          <CardContent className="p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Examen Escrito del {state.dmvName} de {state.name}: Lo Que
              Necesitas Saber
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  Formato del Examen
                </h3>
                <p className="text-gray-600">
                  El examen escrito de conocimientos del {state.dmvName} de{" "}
                  {state.name} consiste en{" "}
                  <strong>
                    {state.writtenTestQuestions} preguntas de opción múltiple
                  </strong>{" "}
                  que cubren leyes de tránsito, señales viales, prácticas de
                  conducción segura y regulaciones específicas de {state.name}.
                  Debes obtener al menos{" "}
                  <strong>
                    {state.passingScore}% ({rawPassing} respuestas correctas)
                  </strong>{" "}
                  para aprobar.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  Edad Mínima y Elegibilidad
                </h3>
                <p className="text-gray-600">
                  Debes tener al menos{" "}
                  <strong>{state.minPermitAge} años</strong> para solicitar un
                  permiso de aprendiz en {state.name}. Necesitarás aprobar el
                  examen escrito de conocimientos y un examen de visión antes de
                  que se emita tu permiso.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  Si Repruebas
                </h3>
                <p className="text-gray-600">{landingInfo.retakeInfo}</p>
              </div>

              <div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  Reglas Específicas de {state.name}
                </h3>
                <ul className="space-y-2">
                  {landingInfo.notableRules.map((rule, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  Manual Oficial del Conductor
                </h3>
                <p className="text-gray-600 mb-3">
                  Estudia el{" "}
                  <strong>{landingInfo.handbookName}</strong> para prepararte
                  para el examen escrito. Las preguntas de práctica de TigerTest
                  están basadas en el material de este manual.
                </p>
                <a
                  href={landingInfo.handbookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-brand hover:text-brand-dark font-medium"
                >
                  <BookOpen className="h-4 w-4" />
                  Descargar el {landingInfo.handbookName}
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* What's Included */}
        <Card className="mb-12">
          <CardContent className="p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Qué Incluye Nuestro Examen de Práctica de {state.name}
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>200 preguntas de práctica</strong> que cubren todos los
                  temas del examen escrito del {state.dmvName}, incluyendo leyes
                  específicas de {state.name}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>4 exámenes de práctica completos</strong> con 50
                  preguntas cada uno, simulando la experiencia real del examen del{" "}
                  {state.dmvName}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Modo de entrenamiento</strong> con retroalimentación
                  instantánea y explicaciones detalladas para cada respuesta
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Seguimiento de progreso</strong> para ver cómo aumenta
                  tu probabilidad de aprobar mientras estudias
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  <strong>Compatible con móviles</strong> — estudia en tu
                  teléfono en la cama, en el sofá o donde sea
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* CTA Banner */}
        <div className="text-center bg-gradient-to-br from-brand to-brand-hover rounded-2xl p-8 md:p-12 mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            ¿Listo para Aprobar tu Examen del DMV de {state.name}?
          </h2>
          <p className="text-brand-light text-lg mb-6">
            Únete a miles de conductores de {state.name} que aprobaron en su
            primer intento con TigerTest
          </p>
          <Link href={`/signup?state=${state.code}`}>
            <Button
              size="lg"
              className="text-lg px-8 py-6 bg-white text-brand-dark hover:bg-gray-100 font-bold rounded-xl"
            >
              Empezar a Practicar Ahora — Es Gratis
            </Button>
          </Link>
        </div>

        {/* Testimonials */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Lo Que Dicen los Estudiantes
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-gray-50 border border-gray-200 rounded-xl p-5"
              >
                <p className="text-gray-800 mb-3 italic">
                  &quot;{t.quote}&quot;
                </p>
                <p className="text-gray-500 text-sm">{t.author}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Preguntas Frecuentes Sobre el Examen del DMV de {state.name}
          </h2>
          <div className="space-y-6">
            {faqItems.map((item, i) => (
              <div key={i}>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  {item.question}
                </h3>
                <p className="text-gray-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related State Pages */}
        {neighboringStates.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Exámenes de Práctica de Estados Cercanos
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {neighboringStates.slice(0, 5).map(
                (neighbor) =>
                  neighbor && (
                    <Link
                      key={neighbor.slug}
                      href={`/es/${neighbor.slug}-examen-practica-dmv`}
                      className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl p-4 hover:border-brand-border hover:bg-brand-light transition-colors"
                    >
                      <span className="font-medium text-gray-900">
                        {neighbor.name}
                      </span>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </Link>
                  )
              )}
            </div>
          </div>
        )}

        {/* Final CTA */}
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">
            ¿Listo para empezar a estudiar para tu examen de permiso de{" "}
            {state.name}?
          </p>
          <Link href={`/signup?state=${state.code}`}>
            <Button
              size="lg"
              className="text-lg px-8 py-6 bg-gray-900 text-white hover:bg-gray-800 font-bold rounded-xl"
            >
              Empezar a Practicar Gratis
            </Button>
          </Link>
          <p className="text-sm text-gray-500 mt-3">
            No se requiere cuenta. Gratis para empezar.
          </p>
        </div>
      </div>
    </div>
  );
}
