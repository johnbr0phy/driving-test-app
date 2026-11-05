import { Question } from "@/types";
import sgresQuestions from "@/data/singapore-res-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Singapore RES exam bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ sgres: sgresQuestions as Question[] });
