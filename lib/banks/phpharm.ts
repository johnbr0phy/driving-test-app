import { Question } from "@/types";
import phpharmQuestions from "@/data/philippines-pharmacist-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Philippines Pharmacist Licensure Examination bank. Imported for its side effect by this
// exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ phpharm: phpharmQuestions as Question[] });
