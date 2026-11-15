import { Question } from "@/types";
import ccrnQuestions from "@/data/ccrn-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The CCRN (Adult) bank. Imported for its side effect by this exam's app pages only, so no
// other exam's pages bundle it.
registerExamBanks({ ccrn: ccrnQuestions as Question[] });
