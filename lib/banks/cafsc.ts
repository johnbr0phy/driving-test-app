import { Question } from "@/types";
import cafscQuestions from "@/data/california-fsc-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The California FSC bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ cafsc: cafscQuestions as Question[] });
