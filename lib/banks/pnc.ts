import { Question } from "@/types";
import pncQuestions from "@/data/property-casualty-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The pnc bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ pnc: pncQuestions as Question[] });
