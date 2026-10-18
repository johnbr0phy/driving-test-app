import { Question } from "@/types";
import insuranceQuestions from "@/data/life-health-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The insurance bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ insurance: insuranceQuestions as Question[] });
