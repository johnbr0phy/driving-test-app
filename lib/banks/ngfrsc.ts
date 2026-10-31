import { Question } from "@/types";
import ngfrscQuestions from "@/data/nigeria-frsc-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Nigeria FRSC Highway Code bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ ngfrsc: ngfrscQuestions as Question[] });
