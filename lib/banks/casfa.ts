import { Question } from "@/types";
import casfaQuestions from "@/data/standard-first-aid-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Canadian Standard First Aid and CPR Level C bank. Imported for its side effect by this
// exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ casfa: casfaQuestions as Question[] });
