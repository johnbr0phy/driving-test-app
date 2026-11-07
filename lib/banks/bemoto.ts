import { Question } from "@/types";
import bemotoQuestions from "@/data/belgium-motorcycle-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Belgium motorcycle theory bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ bemoto: bemotoQuestions as Question[] });
