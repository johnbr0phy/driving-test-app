import { Question } from "@/types";
import aufssQuestions from "@/data/food-safety-supervisor-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Australian food safety supervisor bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ aufss: aufssQuestions as Question[] });
