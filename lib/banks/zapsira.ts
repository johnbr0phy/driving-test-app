import { Question } from "@/types";
import zapsiraQuestions from "@/data/psira-security-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The PSIRA security officer (Grades E to C) bank. Imported for its side effect by this exam's app
// pages only, so no other exam's pages bundle it.
registerExamBanks({ zapsira: zapsiraQuestions as Question[] });
