import { Question } from "@/types";
import hukreszQuestions from "@/data/hungary-kresz-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Hungary KRESZ theory exam bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ hukresz: hukreszQuestions as Question[] });
