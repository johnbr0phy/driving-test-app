import { Question } from "@/types";
import sgsecurityQuestions from "@/data/singapore-security-officer-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Singapore security officer (PLRD licence) bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ sgsecurity: sgsecurityQuestions as Question[] });
