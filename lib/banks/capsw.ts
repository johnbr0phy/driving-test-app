import { Question } from "@/types";
import capswQuestions from "@/data/ontario-psw-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Ontario Personal Support Worker bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ capsw: capswQuestions as Question[] });
