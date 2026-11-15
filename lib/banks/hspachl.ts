import { Question } from "@/types";
import hspachlQuestions from "@/data/hspa-chl-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The HSPA CHL bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ hspachl: hspachlQuestions as Question[] });
