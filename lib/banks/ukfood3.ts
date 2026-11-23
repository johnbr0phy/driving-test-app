import { Question } from "@/types";
import ukfood3Questions from "@/data/uk-level-3-food-safety-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Level 3 food safety (supervising, catering) bank. Imported for its side effect by this
// exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ ukfood3: ukfood3Questions as Question[] });
