import { Question } from "@/types";
import hknurseQuestions from "@/data/hk-nursing-licensing-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Hong Kong nursing Licensing Examination bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ hknurse: hknurseQuestions as Question[] });
