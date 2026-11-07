import { Question } from "@/types";
import mtcpcQuestions from "@/data/malta-driver-cpc-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Malta Driver CPC theory test bank. Imported for its side effect by this
// exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ mtcpc: mtcpcQuestions as Question[] });
