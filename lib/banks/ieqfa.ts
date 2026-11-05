import { Question } from "@/types";
import ieqfaQuestions from "@/data/ieqfa-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The QFA regulation (Ireland, MCC) bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ ieqfa: ieqfaQuestions as Question[] });
