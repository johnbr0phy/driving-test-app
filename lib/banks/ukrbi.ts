import { Question } from "@/types";
import ukrbiQuestions from "@/data/uk-registered-building-inspector-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Building Inspector bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ ukrbi: ukrbiQuestions as Question[] });
