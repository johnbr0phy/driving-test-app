import { Question } from "@/types";
import nbdheQuestions from "@/data/nbdhe-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The NBDHE (National Board Dental Hygiene Examination) bank. Imported for its side effect by
// this exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ nbdhe: nbdheQuestions as Question[] });
