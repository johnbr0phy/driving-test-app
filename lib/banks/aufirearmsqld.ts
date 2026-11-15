import { Question } from "@/types";
import aufirearmsqldQuestions from "@/data/qld-firearms-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Queensland firearms safety course bank. Imported for its side effect by this exam's app
// pages only, so no other exam's pages bundle it.
registerExamBanks({ aufirearmsqld: aufirearmsqldQuestions as Question[] });
