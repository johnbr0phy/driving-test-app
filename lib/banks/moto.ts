import { Question } from "@/types";
import motoQuestions from "@/data/motorcycle-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The moto bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ moto: motoQuestions as Question[] });
