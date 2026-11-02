import { Question } from "@/types";
import ccaQuestions from "@/data/cca-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The CCA bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ cca: ccaQuestions as Question[] });
