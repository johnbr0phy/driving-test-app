import { Question } from "@/types";
import cawhmisQuestions from "@/data/whmis-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The WHMIS bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ cawhmis: cawhmisQuestions as Question[] });
