import { Question } from "@/types";
import cssybQuestions from "@/data/six-sigma-yellow-belt-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The ASQ Certified Six Sigma Yellow Belt bank. Imported for its side effect by this
// exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ cssyb: cssybQuestions as Question[] });
