import { Question } from "@/types";
import inbdeQuestions from "@/data/inbde-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The JCNDE Integrated National Board Dental Examination bank. Imported for its side
// effect by this exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ inbde: inbdeQuestions as Question[] });
