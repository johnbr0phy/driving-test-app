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
  ukfaw: "First Aid at Work courses",
  casfa: "Standard First Aid and CPR Level C courses",
  nclex: "in a nursing program",
  nclexpn: "in a practical nursing program",
  rexpn: "a practical nursing program",
  capsw: "a personal support worker program",
  emt: "an EMT course",
  paramedic: "a paramedic program",
  teas: "TEAS prep",
  hesi: "HESI A2 prep",
  vtne: "a veterinary technology program",
  ukcare: "Care Certificate induction training",
  // High school, military and college classes
  ged: "a GED or adult education class",
  timestables: "a primary school class",
  ks2: "a Year 6 class",
  gcsemaths: "GCSE Maths",
  gcsehigher: "a Year 10 or Year 11 maths class",
  gcsescience: "a GCSE science class",
  gcsecs: "a GCSE Computer Science class",
  elevenplus: "an 11+ group or a Year 5 class",
  fsmaths: "Functional Skills maths classes",
  osslt: "a Grade 10 English class or the OSSLC",
  eqao9: "a Grade 9 math class",
  naplan: "a Year 9 class",
  naplan7: "a Year 7 class",
  nswsel: "a selective test coaching class",
  ocnsw: "a Year 4 OC test coaching class",
  vicsel: "a selective entry coaching class",
  hscmaths: "a Year 12 Mathematics Standard class",
  sat: "SAT prep",
  act: "ACT prep",
  asvab: "ASVAB prep",
  secplus: "a Security+ course",
  aplus: "a CompTIA A+ course",
  aws: "a cloud computing course",
  awssaa: "a cloud architecture course",
  az900: "a cloud computing course",
  ccna: "a CCNA or Cisco Networking Academy course",
  pmp: "a project management course",
  gulfrn: "a Gulf nursing exam review course",
  uklitu: "ESOL or Life in the UK classes",
  cacit: "citizenship classes for newcomers",
  aucit: "citizenship or English classes for new migrants",
  rbt: "the 40-hour RBT training or supervise RBT candidates",
  cpc: "a medical coding program",
  jelec: "an electrical apprenticeship or NEC code class",
  barber: "at a barber school",
  ffi: "a fire academy",
  police: "a criminal justice or police exam prep course",
  faapvt: "a private pilot ground school",
  psat: "PSAT prep",
  praxis: "a teacher preparation program",
  gre: "GRE prep",
  gmat: "GMAT prep",
  netplus: "a networking or Network+ course",
  cissp: "a CISSP or information security course",
  gcdl: "a cloud fundamentals course",
  itil: "an IT service management course",
  psm: "a Scrum or agile course",
  capm: "a project management course",
  ssccgl: "an SSC coaching batch",
  rrbntpc: "a railway exam coaching class",
  ctet: "a CTET or B.Ed coaching class",
  ibpspo: "a bank exam coaching batch",
  rrbgroupd: "a railway exam coaching class",
  sscgd: "an SSC GD coaching batch",
  sscchsl: "an SSC coaching batch",
  sscmts: "an SSC MTS coaching batch",
  uppolice: "a UP Police coaching batch",
  ibpsclerk: "a bank exam coaching batch",
  jnvst: "a Navodaya coaching class or a Class 5 classroom",
  jambeng: "a JAMB tutorial class",
  appsych: "AP Psychology",
  sbipo: "a bank exam coaching batch",
  sbiclerk: "a bank exam coaching batch",
  ibpsrrb: "a bank exam coaching batch",
  delhipolice: "a Delhi Police constable coaching batch",
  biharpolice: "a Bihar Police coaching batch",
  rajpolice: "a Rajasthan Police coaching batch",
  mppolice: "an MP Police coaching batch",
  apush: "AP U.S. History",
  apbio: "AP Biology",
  phcse: "a civil service exam review class",
  upscse: "a civil services coaching class",
  nda: "an NDA coaching batch",
  agniveer: "a defence exam coaching class",
  agniveervayu: "an Agniveer Vayu coaching batch",
  rrbalp: "a railway exam coaching class",
  rpfconst: "an RPF or railway exam coaching batch",
  ssccpo: "an SSC CPO coaching batch",
  apworld: "AP World History: Modern",
  aplang: "AP English Language and Composition",
  phlet: "an LET review class or a teacher education program",
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
  uksia: "an SIA door supervisor course",
  uk18ed: "an 18th Edition (2382) course",
  capal: "the Canadian Firearms Safety Course",
  caelec: "an electrical apprenticeship program",
  caauto: "an automotive service technician apprenticeship class",
  caplumb: "a plumbing apprenticeship class",
  cacarp: "a carpentry apprenticeship or pre-apprenticeship program",
  caweld: "a welding program",
  cawhmis: "WHMIS training for new hires or a co-op class",
  caguard: "an Ontario security guard course",
  auwhite: "White Card courses",
  aursa: "an RSA course",
  aurcg: "an RCG or RSG course",
  aufss: "food safety supervisor courses",
  aufirstaid: "HLTAID011 first aid courses",
  auforklift: "an LF forklift licence course",
  auwah: "working at heights courses",
  cscs: "a construction course or run CSCS test prep",
  ukfood: "Level 2 food hygiene courses",
  ukaplh: "a personal licence course",
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
