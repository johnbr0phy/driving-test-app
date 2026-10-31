import { Question } from "@/types";
import hkdriveQuestions from "@/data/hong-kong-driving-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Hong Kong driving written test bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ hkdrive: hkdriveQuestions as Question[] });
