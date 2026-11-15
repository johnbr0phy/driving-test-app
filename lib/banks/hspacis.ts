import { Question } from "@/types";
import hspacisQuestions from "@/data/hspa-cis-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The HSPA CIS bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ hspacis: hspacisQuestions as Question[] });
