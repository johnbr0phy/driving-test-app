import { Question } from "@/types";
import pkpafQuestions from "@/data/paf-airman-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The PAF airman recruitment (initial) test bank. Imported for its side effect by this exam's
// app pages only, so no other exam's pages bundle it.
registerExamBanks({ pkpaf: pkpafQuestions as Question[] });
