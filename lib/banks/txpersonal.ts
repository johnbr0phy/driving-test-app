import { Question } from "@/types";
import txpersonalQuestions from "@/data/txpersonal-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Texas Personal Lines Insurance bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ txpersonal: txpersonalQuestions as Question[] });
