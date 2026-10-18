import { Question } from "@/types";
import insuranceNyQuestions from "@/data/life-health-ny-questions.json";
import insurancePaQuestions from "@/data/life-health-pa-questions.json";
import insuranceIlQuestions from "@/data/life-health-il-questions.json";
import insuranceOhQuestions from "@/data/life-health-oh-questions.json";
import insuranceGaQuestions from "@/data/life-health-ga-questions.json";
import insuranceNcQuestions from "@/data/life-health-nc-questions.json";
import insuranceMiQuestions from "@/data/life-health-mi-questions.json";
import insuranceNjQuestions from "@/data/life-health-nj-questions.json";
import insuranceVaQuestions from "@/data/life-health-va-questions.json";
import insuranceWaQuestions from "@/data/life-health-wa-questions.json";
import { registerExamBanks } from "@/lib/examData";

// State variant banks for the insurance family. Imported for its side effect by the
// app/<slug>/[state] pages only, so other exams never bundle these.
registerExamBanks({
  "insurance-ny": insuranceNyQuestions as Question[],
  "insurance-pa": insurancePaQuestions as Question[],
  "insurance-il": insuranceIlQuestions as Question[],
  "insurance-oh": insuranceOhQuestions as Question[],
  "insurance-ga": insuranceGaQuestions as Question[],
  "insurance-nc": insuranceNcQuestions as Question[],
  "insurance-mi": insuranceMiQuestions as Question[],
  "insurance-nj": insuranceNjQuestions as Question[],
  "insurance-va": insuranceVaQuestions as Question[],
  "insurance-wa": insuranceWaQuestions as Question[],
});
