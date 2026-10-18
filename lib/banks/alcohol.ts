import { Question } from "@/types";
import alcoholQuestions from "@/data/alcohol-server-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The alcohol bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ alcohol: alcoholQuestions as Question[] });
