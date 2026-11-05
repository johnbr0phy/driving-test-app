import { Question } from "@/types";
import sgvlQuestions from "@/data/singapore-vocational-licence-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Singapore taxi and private hire vocational licence (TDVL / PDVL) bank. Imported for its side
// effect by this exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ sgvl: sgvlQuestions as Question[] });
