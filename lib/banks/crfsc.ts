import { Question } from "@/types";
import crfscQuestions from "@/data/canadian-restricted-firearms-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The CRFSC (Canadian Restricted Firearms Safety Course) bank. Imported for its side effect
// by this exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ crfsc: crfscQuestions as Question[] });
