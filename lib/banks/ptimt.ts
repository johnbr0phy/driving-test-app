import { Question } from "@/types";
import ptimtQuestions from "@/data/portugal-imt-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Portugal IMT driving theory (category B) bank. Imported for its side effect by this exam's app
// pages only, so no other exam's pages bundle it.
registerExamBanks({ ptimt: ptimtQuestions as Question[] });
