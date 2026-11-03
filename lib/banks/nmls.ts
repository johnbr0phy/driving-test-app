import { Question } from "@/types";
import nmlsQuestions from "@/data/nmls-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The NMLS SAFE MLO bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ nmls: nmlsQuestions as Question[] });
