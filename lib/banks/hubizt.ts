import { Question } from "@/types";
import hubiztQuestions from "@/data/hu-biztositaskozvetito-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Hungarian insurance intermediary exam bank (biztosításközvetítői hatósági vizsga), written in
// Hungarian. Imported for its side effect by this exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ hubizt: hubiztQuestions as Question[] });
