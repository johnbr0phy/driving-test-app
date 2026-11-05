import { Question } from "@/types";
import phpsychomQuestions from "@/data/philippines-psychometrician-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Philippines Psychometrician Licensure Examination bank. Imported for its side effect by this
// exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ phpsychom: phpsychomQuestions as Question[] });
