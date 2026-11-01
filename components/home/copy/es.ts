// Spanish homepage copy (components/home/homeCopy.ts): machine-translated, pending native review.
// Register: "tú", like i18n/es.ts.

import type { HomeCopy } from "../homeCopy";

export const es: HomeCopy = {
  heroTitle: "Tests de práctica gratis para aprobar",
  findYourTest: "Encuentra tu test",
  answeredThisWeek: "preguntas respondidas esta semana",
  popularThisWeek: "Populares esta semana",
  popularTests: "Tests populares",
  allTests: (n) => `Los ${n} tests`,
  aboutTheTest: "Sobre el examen",
  aboutEachTest: "Sobre cada examen",
  howItWorks: "Cómo funciona Tigertest",
  steps: [
    {
      label: "Paso 1",
      title: "Apréndelo en el móvil",
      body: "Toca una respuesta y ve al instante si es correcta y por qué. Las preguntas que fallas vuelven hasta que las aciertas, así que unos minutos en el autobús sí cuentan.",
    },
    {
      label: "Paso 2",
      title: "Haz el examen de verdad",
      body: "Cuando las preguntas te parezcan fáciles, haz un test de práctica completo basado en el temario del examen real, con la misma mezcla de temas. Así sabes tu nota antes de que cuente.",
    },
    {
      label: "Paso 3",
      title: "Sabrás cuándo estás listo",
      body: "Tu panel se pone verde a medida que terminas cada bloque y apruebas cada test. Cuando esté todo en verde, reserva el examen.",
    },
  ],
  shotAlts: {
    phones: ["Ejercicio de matemáticas del SAT en un móvil", "Pregunta de técnico quirúrgico en un móvil", "Pregunta de práctica de auxiliar de enfermería en un móvil"],
    desktop: "Test de práctica del SAT con tiempo en un ordenador",
    dashboard: "Panel de Tigertest para el DMV con bloques de entrenamiento y tests de práctica",
  },
  everyTest: "Todos los tests de práctica",
  testsFor: (inName) => `Tests de práctica para ${inName}`,
  usExamPrompt: "¿Te mudas a EE. UU. o estudias para un examen de EE. UU.?",
  seeAllTests: (n) => `Ver los ${n} tests`,
  faqTitle: "Preguntas frecuentes",
  requestTitle: "¿No encuentras tu examen?",
  requestBody: "Añadimos tests nuevos según lo que nos pide la gente. Dinos para cuál estás estudiando.",
  requestCta: "Pedir un test",
  usLead: (examCount) => `${examCount} exámenes, desde el examen teórico del DMV hasta el SAT, enfermería y certificaciones de IT. Cada respuesta explicada. Sin registro.`,
  countryLead: (countryName) =>
    `Tests de práctica gratis para ${countryName}: el examen teórico de conducir y certificaciones que son iguales en todas partes. Cada respuesta explicada. Sin registro.`,
  usFaqs: (examCount) => [
    {
      q: "¿Qué es Tigertest?",
      a: `Tigertest es una web gratuita de tests de práctica para ${examCount} exámenes, desde el examen teórico del DMV en cada estado hasta el SAT, el ACT y exámenes de enfermería, sanidad, IT, oficios y licencias. Cada test sigue el temario publicado del examen real, y cada pregunta explica la respuesta correcta.`,
    },
    {
      q: "¿Tigertest es gratis?",
      a: "Sí. Casi todos los tests son totalmente gratis. El DMV tiene tests de práctica y entrenamiento gratis, más una compra Premium opcional de un solo pago de 9,99 $ (no es una suscripción) que desbloquea dos tests más, más bloques de entrenamiento y estadísticas completas en todos los exámenes de EE. UU.",
    },
    {
      q: "¿Necesito una cuenta?",
      a: "No. Puedes empezar cualquier test sin registrarte. Crea una cuenta gratis si quieres guardar tu progreso en todos tus dispositivos.",
    },
    {
      q: "¿Cómo me ayuda Tigertest a aprobar?",
      a: "El modo entrenamiento te corrige al instante y te vuelve a mostrar las preguntas que fallas hasta que te las sabes. Luego, los tests de práctica completos simulan el examen real, y tus resultados muestran qué temas necesitan más trabajo.",
    },
    {
      q: "¿Tigertest tiene relación con el DMV o con alguna empresa de exámenes?",
      a: "No. Tigertest es independiente y no tiene relación con ningún DMV, empresa de exámenes ni organismo de certificación.",
    },
  ],
  dmv: {
    cta: "Examen teórico del DMV",
    title: "¿Vas a hacer el examen teórico del DMV?",
    body: "200 preguntas basadas en el manual del conductor de tu estado, para los 50 estados y DC.",
    about: "Sobre el test de práctica del DMV",
    questionsOnTest: (n) => `${n} preguntas en el examen escrito`,
    viewAll: "Ver los 50 estados",
  },
  listName: (inName) => `Tests de práctica de Tigertest para ${inName}`,
  faqs: ({ local, inName, authority }) => [
    {
      q: "¿Qué es Tigertest?",
      a:
        local === 0
          ? `Tigertest es una web gratuita de tests de práctica. Para ${inName} tiene certificaciones que son iguales en todas partes, como CompTIA y AWS. Cada pregunta explica la respuesta correcta.`
          : `Tigertest es una web gratuita de tests de práctica. Para ${inName} tiene ${local === 1 ? "un test de conducir basado en las normas oficiales" : `${local} tests de conducir basados en los manuales oficiales`}, además de certificaciones que son iguales en todas partes, como CompTIA y AWS. Cada pregunta explica la respuesta correcta.`,
    },
    { q: "¿Tigertest es gratis?", a: `Sí. Todos los tests para ${inName} son gratis, sin suscripción.` },
    {
      q: "¿Necesito una cuenta?",
      a: "No. Puedes empezar cualquier test sin registrarte. Crea una cuenta gratis si quieres guardar tu progreso en todos tus dispositivos.",
    },
    {
      q: "¿Cómo me ayuda Tigertest a aprobar?",
      a: "El modo entrenamiento te corrige al instante y te vuelve a mostrar las preguntas que fallas hasta que te las sabes. Luego, los tests de práctica completos simulan el examen real, y tus resultados muestran qué temas necesitan más trabajo.",
    },
    {
      q: "¿Tigertest es un test oficial?",
      a: `No. Tigertest es independiente y no tiene relación con ${authority} ni con ninguna empresa de exámenes. Las preguntas son originales y están basadas en los manuales oficiales.`,
    },
  ],
  card: {
    questions: (n) => `${n} preguntas`,
    free: "Gratis",
    freePlusPremium: "Gratis + Premium",
    answeredThisWeek: "respondidas esta semana",
    availableIn: (names) => `Disponible en ${names}`,
  },
  search: {
    placeholder: "Busca exámenes o profesiones",
    label: "Buscar tests de práctica",
    clear: "Borrar búsqueda",
    countOf: (count, total) => `${count} de ${total} tests`,
    allFree: (n) => `${n} tests de práctica, todos gratis para empezar`,
    noMatch: (q) => `Ningún test coincide con “${q}”`,
    noMatchHint: "Prueba con el nombre del examen, la profesión o el organismo que lo certifica.",
  },
  pills: {
    showTestsFor: "Ver tests para",
    testsByCountry: "Tests por país",
    countryTests: (name) => `Tests de ${name}`,
    moreCountries: "Más países",
    saved: "Guardado para la próxima vez. Tu progreso es el mismo en todos los países.",
    geo: (inName) => `Te mostramos tests para ${inName} porque estás allí. Elige otro país cuando quieras.`,
  },
};

/** Every country's name in Spanish, for the country pills and "Practice tests for <country>". */
export const countryNames: Record<string, string> = {
  US: "Estados Unidos", CA: "Canadá", UK: "Reino Unido", IE: "Irlanda", AU: "Australia", NZ: "Nueva Zelanda", IN: "India",
  PH: "Filipinas", MY: "Malasia", SG: "Singapur", HK: "Hong Kong", AE: "Emiratos Árabes Unidos", ZA: "Sudáfrica",
  NG: "Nigeria", KE: "Kenia", PK: "Pakistán", ES: "España", PT: "Portugal", RO: "Rumanía", SE: "Suecia", GR: "Grecia",
  DK: "Dinamarca", HU: "Hungría", BE: "Bélgica", FI: "Finlandia", MT: "Malta", DE: "Alemania",
};

/** Spain's own homepage lines (REGION_HOME.ES in lib/region.ts), in Spanish. */

/** Each country as a sentence names it after "para", with its article ("para el Reino Unido"). */
export const inNames: Record<string, string> = {
  US: "Estados Unidos", CA: "Canadá", UK: "el Reino Unido", IE: "Irlanda", AU: "Australia", NZ: "Nueva Zelanda", IN: "la India",
  PH: "Filipinas", MY: "Malasia", SG: "Singapur", HK: "Hong Kong", AE: "los Emiratos Árabes Unidos", ZA: "Sudáfrica",
  NG: "Nigeria", KE: "Kenia", PK: "Pakistán", ES: "España", PT: "Portugal", RO: "Rumanía", SE: "Suecia", GR: "Grecia",
  DK: "Dinamarca", HU: "Hungría", BE: "Bélgica", FI: "Finlandia", MT: "Malta", DE: "Alemania",
};
