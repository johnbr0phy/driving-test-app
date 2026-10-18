import { Question } from "@/types";
import pncTxQuestions from "@/data/property-casualty-tx-questions.json";
import pncFlQuestions from "@/data/property-casualty-fl-questions.json";
import pncCaQuestions from "@/data/property-casualty-ca-questions.json";
import pncNyQuestions from "@/data/property-casualty-ny-questions.json";
import pncPaQuestions from "@/data/property-casualty-pa-questions.json";
import pncIlQuestions from "@/data/property-casualty-il-questions.json";
import pncOhQuestions from "@/data/property-casualty-oh-questions.json";
import pncGaQuestions from "@/data/property-casualty-ga-questions.json";
import pncNcQuestions from "@/data/property-casualty-nc-questions.json";
import pncMiQuestions from "@/data/property-casualty-mi-questions.json";
import pncNjQuestions from "@/data/property-casualty-nj-questions.json";
import pncVaQuestions from "@/data/property-casualty-va-questions.json";
import pncWaQuestions from "@/data/property-casualty-wa-questions.json";
import { registerExamBanks } from "@/lib/examData";

// State variant banks for the pnc family. Imported for its side effect by the
// app/<slug>/[state] pages only, so other exams never bundle these.
registerExamBanks({
  "pnc-tx": pncTxQuestions as Question[],
  "pnc-fl": pncFlQuestions as Question[],
  "pnc-ca": pncCaQuestions as Question[],
  "pnc-ny": pncNyQuestions as Question[],
  "pnc-pa": pncPaQuestions as Question[],
  "pnc-il": pncIlQuestions as Question[],
  "pnc-oh": pncOhQuestions as Question[],
  "pnc-ga": pncGaQuestions as Question[],
  "pnc-nc": pncNcQuestions as Question[],
  "pnc-mi": pncMiQuestions as Question[],
  "pnc-nj": pncNjQuestions as Question[],
  "pnc-va": pncVaQuestions as Question[],
  "pnc-wa": pncWaQuestions as Question[],
});
