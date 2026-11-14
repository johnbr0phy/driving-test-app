import { USD_PRICE, formatPrice } from "@/lib/pricing";

// The "How much does it cost?" FAQ on the landings of the healthcare entry
// exams, where buyers are used to paying for question banks: says plainly
// that Tigertest is free to start and Premium is one payment, against the
// paid prep people compare it with. No competitor is named or priced
// beyond "often $100 or more". priceFaqJsonLd() is the same item for the
// page's FAQPage graph; keep the two in step. The price is the US list
// price; other countries pay a local price (lib/pricing.ts).

export const PRICE_FAQ_EXAMS: Record<string, string> = {
  teas: "TEAS",
  hesi: "HESI A2",
  cna: "CNA",
  nclex: "NCLEX-RN",
  nclexpn: "NCLEX-PN",
  ptcb: "PTCB",
  emt: "NREMT EMT",
};

const question = (examId: string) => `How much does Tigertest ${PRICE_FAQ_EXAMS[examId]} practice cost compared with paid prep?`;

function answer(examId: string): string {
  const name = PRICE_FAQ_EXAMS[examId];
  return `Tigertest is free to start, with no account needed: most of the ${name} practice is free. Tigertest Premium, which unlocks the last steps and full stats on every exam, is one payment of ${formatPrice(USD_PRICE)} in the US (a local price in other countries), not a subscription. Paid ${name} question banks and prep courses often cost $100 or more, many of them as a monthly subscription.`;
}

export function priceFaqJsonLd(examId: string) {
  return {
    "@type": "Question",
    name: question(examId),
    acceptedAnswer: { "@type": "Answer", text: answer(examId) },
  };
}

export function ExamPriceFaq({ examId }: { examId: string }) {
  if (!PRICE_FAQ_EXAMS[examId]) return null;
  return (
    <div>
      <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{question(examId)}</h3>
      <p className="text-gray-600 dark:text-gray-300">{answer(examId)}</p>
    </div>
  );
}
