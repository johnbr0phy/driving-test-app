import { Question } from "@/types";
import uklituQuestions from "@/data/life-in-the-uk-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Life in the UK bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ uklitu: uklituQuestions as Question[] });
