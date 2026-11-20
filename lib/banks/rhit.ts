import { Question } from "@/types";
import rhitQuestions from "@/data/rhit-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The RHIT bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ rhit: rhitQuestions as Question[] });
