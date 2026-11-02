import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Monitor, Smartphone } from "lucide-react";
import { getTigerAsset } from "@/lib/tigerAssets";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { landingUpdatedAt } from "@/lib/landingDates";
import { ORGANIZATION_ID } from "@/lib/siteSchema";
import { SITE_URL } from "@/lib/siteUrl";

// Spanish landing for the CDL general knowledge test. The app pages are the
// same /cdl/* routes in Spanish (ExamConfig.translations.es); the CTA here
// switches the app language before opening the dashboard.

const siteUrl = SITE_URL;
const url = `${siteUrl}/es/examen-practica-cdl`;
const enUrl = `${siteUrl}/cdl-practice-test`;

const title = "Examen de Práctica CDL en Español 2026 - Gratis";
const metaDescription =
  "Examen de práctica CDL gratis en español: 600 preguntas de conocimientos generales con explicaciones y seis exámenes como el real. Sin cuenta.";
const description =
  "Examen de práctica CDL gratis en español: 600 preguntas de conocimientos generales con explicaciones. Seis exámenes de 50 preguntas como el real y práctica por tema. Sin cuenta.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "examen CDL en español, examen de práctica CDL, licencia de manejo comercial, CDL conocimientos generales, preguntas del examen CDL, examen CDL gratis",
  alternates: {
    canonical: url,
    languages: { en: enUrl, es: url, "x-default": enUrl },
  },
  openGraph: {
    title,
    description: metaDescription,
    url,
    images: [{ url: shareImageUrl("cdl", "es"), width: 1200, height: 630, alt: "Examen de práctica CDL gratis de Tigertest" }],
    siteName: "Tigertest",
    type: "website",
    locale: "es_US",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("cdl", "es")],
    title,
    description: metaDescription,
  },
};

const facts = [
  { label: "Preguntas", value: "50 (lo usual)" },
  { label: "Para aprobar", value: "80% (40 correctas)" },
  { label: "Dónde", value: "La oficina de licencias de tu estado" },
  { label: "Se requiere para", value: "Licencias comerciales clase A, B y C" },
];

const faqs = [
  {
    q: "¿Puedo tomar el examen de la CDL en español?",
    a: "Depende del estado. Algunos ofrecen el examen de conocimientos generales en español y otros solo en inglés, y varios han cambiado sus reglas hace poco. Pregunta en la oficina de licencias de tu estado antes de programarlo. Las reglas federales también piden que puedas leer y hablar inglés lo suficiente para entender las señales y comunicarte en la carretera, así que practicar en los dos idiomas te ayuda.",
  },
  {
    q: "¿Cuántas preguntas tiene el examen de conocimientos generales de la CDL?",
    a: "Normalmente tiene 50 preguntas y necesitas 40 correctas (80%) para aprobar. Tigertest tiene 600 preguntas de práctica para que llegues preparado a cualquier tema.",
  },
  {
    q: "¿El examen de práctica CDL de Tigertest es gratis?",
    a: "Sí. Los seis exámenes de práctica y todos los grupos de práctica por tema son gratis. No hay costos ocultos ni necesitas crear una cuenta.",
  },
  {
    q: "¿Qué temas cubre el examen de práctica?",
    a: "Inspección del vehículo, conducción segura, sistemas de frenos (incluidos los frenos de aire), manejo y sujeción de la carga, emergencias, alcohol y drogas, y manejo con mal tiempo, de noche, en montañas y en cruces de ferrocarril. Todo sale del manual de la CDL.",
  },
  {
    q: "¿Cómo debo estudiar para el examen de la CDL?",
    a: "Empieza con la práctica por tema: respondes, ves la explicación al instante y las preguntas que fallas vuelven hasta que las domines. Cuando termines los seis grupos, haz los exámenes de práctica hasta sacar 80% o más de forma constante.",
  },
  {
    q: "¿Necesito un permiso antes del examen de conocimientos generales?",
    a: "No. El examen de conocimientos generales es el primer paso. Cuando lo apruebas, junto con los endosos que necesites, recibes tu permiso de aprendizaje comercial (CLP), que te deja practicar el manejo.",
  },
];

const topics = [
  "Inspección del vehículo",
  "Conducción segura",
  "Sistemas de frenos",
  "Manejo de la carga",
  "Procedimientos de emergencia",
  "Alcohol y drogas",
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: title,
      description,
      inLanguage: "es-US",
      dateModified: landingUpdatedAt("cdl"),
      isPartOf: { "@id": `${siteUrl}/#website` },
      publisher: { "@id": ORGANIZATION_ID },
      citation: "https://www.fmcsa.dot.gov/registration/commercial-drivers-license",
    },
    {
      "@type": "WebApplication",
      name: "Tigertest - Examen de práctica CDL gratis",
      description:
        "600 preguntas de práctica en español para el examen de conocimientos generales de la licencia de manejo comercial (CDL).",
      url,
      inLanguage: "es-US",
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      publisher: { "@id": ORGANIZATION_ID },
    },
    {
      "@type": "FAQPage",
      inLanguage: "es-US",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function CDLLandingPageEs() {
  return (
    <div data-theme="cdl" className="flex-1 bg-white dark:bg-gray-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />


      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Examen de Práctica CDL en Español 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/cdl/dashboard"
            shortName="CDL"
            lang="es"
            subtitle="600 preguntas de conocimientos generales, todas en español. Seis exámenes como el real. Hecho para el celular. Sin cuenta."
            shots={{ mobile: "/landing/cdl-mobile-es.png", desktop: "/landing/cdl-desktop-es.png" }}
          />
        </div>
      </div>

      {/* At a glance (Spanish counterpart of ExamFacts) */}
      <section aria-labelledby="exam-facts" className="max-w-4xl mx-auto px-6 pt-8 md:pt-12">
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 md:p-8">
          <h2 id="exam-facts" className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-50 mb-4">
            El examen de la CDL en resumen
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-200 mb-3">
            El examen de conocimientos generales de la CDL suele tener 50 preguntas de opción múltiple y necesitas 40
            correctas (80%) para aprobar. Se hace en la oficina de licencias de tu estado y se requiere para todas las
            clases de licencia de manejo comercial. Las preguntas salen del manual de la CDL: inspección, conducción
            segura, frenos, carga y emergencias.
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Tigertest tiene 600 preguntas de práctica de la CDL en español con explicaciones, todas gratis y sin cuenta.
          </p>
          <dl className="grid sm:grid-cols-2 gap-x-8 border-t border-gray-200 dark:border-gray-800">
            {facts.map((row) => (
              <div key={row.label} className="flex justify-between gap-4 py-3 border-b border-gray-200 dark:border-gray-800">
                <dt className="max-w-[50%] text-gray-500 dark:text-gray-400">{row.label}</dt>
                <dd className="min-w-0 text-right font-medium [overflow-wrap:anywhere] text-gray-900 dark:text-gray-50">{row.value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-5 text-sm text-gray-500 dark:text-gray-400">
            Las preguntas siguen el manual de la CDL basado en las reglas de la FMCSA que usan todos los estados. Las reglas
            cambian, así que confirma los detalles con la{" "}
            <a
              href="https://www.fmcsa.dot.gov/registration/commercial-drivers-license"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-dark underline underline-offset-2 hover:decoration-2 [overflow-wrap:anywhere]"
            >
              FMCSA
              <ExternalLink className="ml-0.5 inline h-3 w-3 align-baseline" aria-hidden="true" />
            </a>{" "}
            y con tu estado.
          </p>
        </div>
      </section>

      {/* How it works */}
      <div id="how-it-works" className="max-w-5xl mx-auto px-6 pt-8 pb-16 md:pt-12 md:pb-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-16">Cómo funciona</h2>
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-brand-border-light rounded-full flex items-center justify-center shadow-sm">
              <Smartphone className="w-7 h-7 text-brand-dark" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Práctica por tema</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Estudia en el celular donde estés. Inspección, frenos, carga y más, con la explicación de cada respuesta al
                instante. Las preguntas que fallas vuelven hasta que las domines.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Exámenes de práctica</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Seis exámenes de 50 preguntas, repartidos por tema como el examen real. Al terminar ves tu calificación y
                qué repasar.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Topics */}
      <div className="bg-gray-50 dark:bg-gray-950">
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-24">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">
                Preguntas basadas en las normas federales
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                A diferencia del examen de manejo normal, los requisitos de la CDL son federales. Las preguntas cubren los
                temas del manual oficial de la CDL que salen en tu examen.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600 dark:text-gray-300">
                {topics.map((topic) => (
                  <div key={topic} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-brand rounded-full mt-2 flex-shrink-0"></div>
                    <span>{topic}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image src={getTigerAsset("cdl", 1)} alt="Mascota de Tigertest" width={180} height={180} className="w-32 md:w-44" />
            </div>
          </div>
        </div>
      </div>

      {/* How to pass */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Cómo aprobar el examen de conocimientos generales de la CDL
        </h2>
        <div className="space-y-8 text-gray-600 dark:text-gray-300">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Estudia el manual de la CDL</h3>
            <p>
              El manual cubre las reglas federales del manejo comercial y de ahí sale cada pregunta del examen. Muchos
              estados lo publican también en español.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Domina la inspección del vehículo</h3>
            <p>
              La inspección es el tema que más pesa. Usa la práctica por tema para aprender qué revisar, en qué orden y
              cómo reconocer un problema.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Practica como en el examen real</h3>
            <p>
              Cuando termines los grupos, haz los seis exámenes de práctica. Cada uno tiene 50 preguntas y se aprueba con
              80% (40 correctas). Busca sacar 80% o más de forma constante.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Repasa lo que fallas</h3>
            <p>
              Tigertest guarda cada pregunta que fallas y te deja repasarlas hasta corregirlas. Dedica más tiempo a los
              temas donde más fallas.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-gray-50 dark:bg-gray-950">
        <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
            Preguntas frecuentes sobre el examen de la CDL
          </h2>
          <div className="space-y-8">
            {faqs.map((f) => (
              <div key={f.q}>
                <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
                <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
              </div>
            ))}
          </div>
          <p className="mt-12 text-center text-gray-600 dark:text-gray-300">
            ¿Buscas el examen de manejo normal?{" "}
            <Link href="/es/examenes-practica-por-estado" className="text-brand-dark font-medium hover:underline">
              Exámenes de práctica del DMV en español
            </Link>
          </p>
        </div>
      </div>

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">¿Listo para sacar tu CDL?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">
            Gratis y sin cuenta. 600 preguntas en español sobre todos los temas de la CDL.
          </p>
          <ExamLandingCTA dashboardHref="/cdl/dashboard" lang="es" />
        </div>
      </div>
    </div>
  );
}
