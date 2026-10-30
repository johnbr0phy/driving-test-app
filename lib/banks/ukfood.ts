import { Question } from "@/types";
import ukfoodQuestions from "@/data/uk-food-hygiene-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The UK Level 2 food hygiene bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ ukfood: ukfoodQuestions as Question[] });
