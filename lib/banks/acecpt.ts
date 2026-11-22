import { Question } from "@/types";
import acecptQuestions from "@/data/ace-cpt-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The ACE CPT bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ acecpt: acecptQuestions as Question[] });
