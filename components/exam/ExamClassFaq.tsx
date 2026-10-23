import Link from "next/link";

// The "Can my students use Tigertest?" FAQ on the landings of exams people
// usually study for with an instructor (the TEACHER_LED set in
// components/TeachNudge.tsx). Teachers find these pages through search, so the
// last FAQ points them at /teach. classFaqJsonLd() is the same item for the
// page's FAQPage graph; keep the two in step.

const TEACHES: Record<string, string> = {
  // The DMV landing (/dmv-practice-test)
  dmv: "driver's ed or run a driving school",
  // Healthcare programs
  cst: "a surgical technology program",
  crcst: "a sterile processing program",
  htl: "a histotechnology program",
  cna: "a nurse aide program",
  ptcb: "a pharmacy technician program",
  phleb: "a phlebotomy program",
  ccma: "a medical assistant program",
  cet: "an EKG technician program",
  danb: "a dental assisting program",
  cpr: "CPR and first aid classes",
  nclex: "in a nursing program",
  nclexpn: "in a practical nursing program",
  emt: "an EMT course",
  paramedic: "a paramedic program",
  teas: "TEAS prep",
  hesi: "HESI A2 prep",
  vtne: "a veterinary technology program",
  // High school, military and college classes
  ged: "a GED or adult education class",
  timestables: "a primary school class",
  sat: "SAT prep",
  act: "ACT prep",
  asvab: "ASVAB prep",
  secplus: "a Security+ course",
  aplus: "a CompTIA A+ course",
  aws: "a cloud computing course",
  // Trade schools, pre-licensing courses and instructor-led certifications
  cdl: "CDL classes or run a truck driving school",
  cdlx: "CDL endorsement classes",
  moto: "a motorcycle safety course",
  osha: "OSHA 10 classes",
  forklift: "forklift operator training",
  epa608: "EPA 608 certification classes",
  foodmgr: "food safety manager classes",
  security: "security guard training",
  lifeguard: "lifeguard classes",
  cosmetology: "at a cosmetology school",
  hunter: "hunter education",
  realestate: "a real estate pre-licensing course",
  insurance: "a life and health insurance pre-licensing course",
  pnc: "a property and casualty pre-licensing course",
  ham: "a ham radio licensing class",
  civics: "citizenship classes",
};

function question(examId: string): string {
  return `I teach ${TEACHES[examId] ?? "this course"}. Can my students use Tigertest?`;
}

const ANSWER_REST =
  ", post one link, and students join with just their name. You see who practiced, their test scores and the topics your class misses most.";

export function classFaqJsonLd(examId: string) {
  return {
    "@type": "Question",
    name: question(examId),
    acceptedAnswer: {
      "@type": "Answer",
      text: `Yes, for free. Make a class at tigertest.io/teach${ANSWER_REST}`,
    },
  };
}

export function ExamClassFaq({ examId }: { examId: string }) {
  return (
    <div>
      <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{question(examId)}</h3>
      <p className="text-gray-600 dark:text-gray-300">
        Yes, for free.{" "}
        <Link href="/teach" className="text-brand-dark hover:text-brand-darker underline">
          Make a class at tigertest.io/teach
        </Link>
        {ANSWER_REST}
      </p>
    </div>
  );
}
