import { Question } from "@/types";
import ccafQuestions from "@/data/claude-certified-architect-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Salesforce Certified Platform Administrator bank. Imported for its side effect by this
// exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ ccaf: ccafQuestions as Question[] });
