import { Question } from "@/types";
import punjabpoliceQuestions from "@/data/punjab-police-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Punjab Police constable bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ punjabpolice: punjabpoliceQuestions as Question[] });
