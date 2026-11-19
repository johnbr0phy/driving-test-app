import { Question } from "@/types";
import backflowQuestions from "@/data/backflow-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The backflow bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ backflow: backflowQuestions as Question[] });
