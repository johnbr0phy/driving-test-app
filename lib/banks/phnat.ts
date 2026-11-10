import { Question } from "@/types";
import phnatQuestions from "@/data/nursing-aptitude-test-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Nursing Aptitude Test (Philippines) bank. Imported for its side effect by this exam's app
// pages only, so no other exam's pages bundle it.
registerExamBanks({ phnat: phnatQuestions as Question[] });
