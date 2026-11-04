import { Question } from "@/types";
import cssgbQuestions from "@/data/six-sigma-green-belt-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The ASQ Certified Six Sigma Green Belt bank. Imported for its side effect by this
// exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ cssgb: cssgbQuestions as Question[] });
