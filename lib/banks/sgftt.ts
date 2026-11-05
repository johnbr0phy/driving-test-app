import { Question } from "@/types";
import sgfttQuestions from "@/data/singapore-ftt-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Singapore Final Theory Test bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ sgftt: sgfttQuestions as Question[] });
