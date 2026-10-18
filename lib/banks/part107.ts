import { Question } from "@/types";
import part107Questions from "@/data/part107-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The part107 bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ part107: part107Questions as Question[] });
