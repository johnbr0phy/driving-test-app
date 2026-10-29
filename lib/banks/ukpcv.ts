import { Question } from "@/types";
import ukpcvQuestions from "@/data/uk-pcv-theory-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The PCV theory test bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ ukpcv: ukpcvQuestions as Question[] });
