import { Question } from "@/types";
import ppscQuestions from "@/data/ppsc-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The PPSC general ability bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ ppsc: ppscQuestions as Question[] });
