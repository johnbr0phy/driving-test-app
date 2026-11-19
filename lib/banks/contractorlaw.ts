import { Question } from "@/types";
import contractorlawQuestions from "@/data/contractor-business-law-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The contractor Business and Law bank. Imported for its side effect by this exam's app pages
// only, so no other exam's pages bundle it.
registerExamBanks({ contractorlaw: contractorlawQuestions as Question[] });
