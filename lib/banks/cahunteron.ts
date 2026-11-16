import { Question } from "@/types";
import cahunteronQuestions from "@/data/ontario-hunter-education-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Ontario Hunter Education Program exam bank. Imported for its side effect by this exam's
// app pages only, so no other exam's pages bundle it.
registerExamBanks({ cahunteron: cahunteronQuestions as Question[] });
