import { Question } from "@/types";
import llqpQuestions from "@/data/llqp-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The LLQP (Canada life licence) bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ llqp: llqpQuestions as Question[] });
