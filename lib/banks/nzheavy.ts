import { Question } from "@/types";
import nzheavyQuestions from "@/data/nz-heavy-vehicle-licence-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The New Zealand Class 2 heavy vehicle licence theory bank. Imported for its side effect by this
// exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ nzheavy: nzheavyQuestions as Question[] });
