import { Question } from "@/types";
import escapcondQuestions from "@/data/es-cap-conductores-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Spain Driver CPC (CAP) initial qualification bank, written in Spanish. Imported for its
// side effect by this exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ escapcond: escapcondQuestions as Question[] });
