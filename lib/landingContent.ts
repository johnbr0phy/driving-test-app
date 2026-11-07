// Landing content in a language other than English, for the pages that quote
// an exam outside its own landing: a country homepage in that language lists
// each test with its landing's facts answer ("Über jede Prüfung"). Server only.
// Register a landing here when its country homepage is in its language: a
// native exam's base landing (detheorie.de) and a translation that becomes its
// country's page language (esdgt.es, ptimt.pt).

/** One exam landing in one language (lib/landings/<examId>.<lang>.json),
 *  rendered by components/exam/TranslatedExamLanding.tsx. */
export interface TranslatedLandingContent {
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  breadcrumb: { home: string; allTests: string; current: string };
  h1: string;
  subtitle: string;
  facts: {
    h2: string;
    answer: string;
    tigertest: string;
    rows: { label: string; value: string }[];
    footnote: string;
    /** The official source in this language; defaults to EXAM_FACTS[id].source (English). */
    source?: { name: string; url: string };
  };
  howItWorks: { h2: string; cards: { h3: string; p: string }[] };
  topics: { h2: string; p: string; items: string[] };
  howToPass: { h2: string; steps: { h3: string; p: string }[] };
  faqTitle: string;
  faqs: { q: string; a: string }[];
  finalCta: { h2: string; p: string };
}
import detheorieDe from "@/lib/landings/detheorie.de.json";
import esdgtEs from "@/lib/landings/esdgt.es.json";
import ptimtPt from "@/lib/landings/ptimt.pt.json";
import escapcondEs from "@/lib/landings/escapcond.es.json";
import espoliciaEs from "@/lib/landings/espolicia.es.json";
import esguardiaEs from "@/lib/landings/esguardia.es.json";
import esvigilanteEs from "@/lib/landings/esvigilante.es.json";
import demotorradDe from "@/lib/landings/demotorrad.de.json";
import deaevoDe from "@/lib/landings/deaevo.de.json";
import de34aDe from "@/lib/landings/de34a.de.json";
import deheilprDe from "@/lib/landings/deheilpr.de.json";
import ptcamPt from "@/lib/landings/ptcam.pt.json";
import pttvdePt from "@/lib/landings/pttvde.pt.json";
import ptvigilPt from "@/lib/landings/ptvigil.pt.json";
import setrafikSv from "@/lib/landings/setrafik.sv.json";
import semotoSv from "@/lib/landings/semoto.sv.json";
import sejaktSv from "@/lib/landings/sejakt.sv.json";
import semedbSv from "@/lib/landings/semedb.sv.json";
import dkteoriDa from "@/lib/landings/dkteori.da.json";
import dkindfoedDa from "@/lib/landings/dkindfoed.da.json";
import dkmedborgerDa from "@/lib/landings/dkmedborger.da.json";
import dkjagtDa from "@/lib/landings/dkjagt.da.json";
import fitheoryFi from "@/lib/landings/fitheory.fi.json";
import fihuntFi from "@/lib/landings/fihunt.fi.json";
import hukreszHu from "@/lib/landings/hukresz.hu.json";
import huelsosegHu from "@/lib/landings/huelsoseg.hu.json";
import hubiztHu from "@/lib/landings/hubizt.hu.json";
import sehpSv from "@/lib/landings/sehp.sv.json";

const LANDINGS: Record<string, TranslatedLandingContent> = {
  "detheorie.de": detheorieDe as TranslatedLandingContent,
  "esdgt.es": esdgtEs as TranslatedLandingContent,
  "ptimt.pt": ptimtPt as TranslatedLandingContent,
  "escapcond.es": escapcondEs as TranslatedLandingContent,
  "espolicia.es": espoliciaEs as TranslatedLandingContent,
  "esguardia.es": esguardiaEs as TranslatedLandingContent,
  "esvigilante.es": esvigilanteEs as TranslatedLandingContent,
  "demotorrad.de": demotorradDe as TranslatedLandingContent,
  "deaevo.de": deaevoDe as TranslatedLandingContent,
  "de34a.de": de34aDe as TranslatedLandingContent,
  "deheilpr.de": deheilprDe as TranslatedLandingContent,
  "ptcam.pt": ptcamPt as TranslatedLandingContent,
  "pttvde.pt": pttvdePt as TranslatedLandingContent,
  "ptvigil.pt": ptvigilPt as TranslatedLandingContent,
  "setrafik.sv": setrafikSv as TranslatedLandingContent,
  "semoto.sv": semotoSv as TranslatedLandingContent,
  "sejakt.sv": sejaktSv as TranslatedLandingContent,
  "semedb.sv": semedbSv as TranslatedLandingContent,
  "dkteori.da": dkteoriDa as TranslatedLandingContent,
  "dkindfoed.da": dkindfoedDa as TranslatedLandingContent,
  "dkmedborger.da": dkmedborgerDa as TranslatedLandingContent,
  "dkjagt.da": dkjagtDa as TranslatedLandingContent,
  "fitheory.fi": fitheoryFi as TranslatedLandingContent,
  "fihunt.fi": fihuntFi as TranslatedLandingContent,
  "hukresz.hu": hukreszHu as TranslatedLandingContent,
  "huelsoseg.hu": huelsosegHu as TranslatedLandingContent,
  "hubizt.hu": hubiztHu as TranslatedLandingContent,
  "sehp.sv": sehpSv as TranslatedLandingContent,
};

/** The landing content of `examId` in `lang`, if one is registered. */
export function landingContent(examId: string, lang: string): TranslatedLandingContent | undefined {
  return LANDINGS[`${examId}.${lang}`];
}
