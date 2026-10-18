import { Question } from "@/types";
import danbQuestions from "@/data/danb-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The danb bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ danb: danbQuestions as Question[] });
