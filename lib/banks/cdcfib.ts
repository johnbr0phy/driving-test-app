import { Question } from "@/types";
import cdcfibQuestions from "@/data/cdcfib-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The CDCFIB recruitment CBT bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ cdcfib: cdcfibQuestions as Question[] });
