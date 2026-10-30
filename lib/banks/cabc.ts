import { Question } from "@/types";
import cabcQuestions from "@/data/icbc-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The ICBC knowledge test bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ cabc: cabcQuestions as Question[] });
