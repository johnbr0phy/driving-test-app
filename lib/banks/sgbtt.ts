import { Question } from "@/types";
import sgbttQuestions from "@/data/singapore-btt-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Singapore Basic Theory Test bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ sgbtt: sgbttQuestions as Question[] });
