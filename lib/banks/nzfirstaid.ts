import { Question } from "@/types";
import nzfirstaidQuestions from "@/data/nz-first-aid-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The New Zealand workplace first aid bank (NZQA 41052 and 41053). Imported for its side effect
// by this exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ nzfirstaid: nzfirstaidQuestions as Question[] });
