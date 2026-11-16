import { Question } from "@/types";
import bcrealestateQuestions from "@/data/bc-real-estate-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The BC real estate trading services exam bank. Imported for its side effect by this
// exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ bcrealestate: bcrealestateQuestions as Question[] });
