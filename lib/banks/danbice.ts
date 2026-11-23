import { Question } from "@/types";
import danbiceQuestions from "@/data/danb-ice-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The DANB Infection Control bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ danbice: danbiceQuestions as Question[] });
