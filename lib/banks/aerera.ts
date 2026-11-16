import { Question } from "@/types";
import aereraQuestions from "@/data/rera-broker-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Dubai RERA real estate broker bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ aerera: aereraQuestions as Question[] });
