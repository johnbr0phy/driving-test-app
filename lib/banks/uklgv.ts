import { Question } from "@/types";
import uklgvQuestions from "@/data/uk-lgv-theory-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The UK LGV theory bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ uklgv: uklgvQuestions as Question[] });
