import { Question } from "@/types";
import dispatcherQuestions from "@/data/dispatcher-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The 911 Public Safety Telecommunicator bank. Imported for its side effect by this exam's app
// pages only, so no other exam's pages bundle it.
registerExamBanks({ dispatcher: dispatcherQuestions as Question[] });
