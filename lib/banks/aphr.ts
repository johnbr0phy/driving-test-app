import { Question } from "@/types";
import aphrQuestions from "@/data/aphr-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The aPHR bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ aphr: aphrQuestions as Question[] });
