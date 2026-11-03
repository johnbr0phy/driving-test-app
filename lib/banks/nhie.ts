import { Question } from "@/types";
import nhieQuestions from "@/data/nhie-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The National Home Inspector Examination bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ nhie: nhieQuestions as Question[] });
