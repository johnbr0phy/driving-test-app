import { Question } from "@/types";
import cfpQuestions from "@/data/cfp-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The CFP Board CFP Certification Examination bank. Imported for its side effect by this
// exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ cfp: cfpQuestions as Question[] });
