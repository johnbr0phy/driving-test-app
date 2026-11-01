import { Question } from "@/types";
import pkdriveQuestions from "@/data/pakistan-driving-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Pakistan driving licence bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ pkdrive: pkdriveQuestions as Question[] });
