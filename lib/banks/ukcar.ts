import { Question } from "@/types";
import ukcarQuestions from "@/data/uk-car-theory-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The UK car theory test bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ ukcar: ukcarQuestions as Question[] });
