import { Question } from "@/types";
import auwaQuestions from "@/data/wa-learners-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The WA learner's test bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ auwa: auwaQuestions as Question[] });
