import { Question } from "@/types";
import nasmQuestions from "@/data/nasm-cpt-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The NASM CPT bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ nasm: nasmQuestions as Question[] });
