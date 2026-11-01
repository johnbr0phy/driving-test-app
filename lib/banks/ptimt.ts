import { Question } from "@/types";
import ptimtQuestions from "@/data/portugal-imt-questions.json";
import ptimtQuestionsPt from "@/data/portugal-imt-questions_pt.json";
import { registerExamBanks } from "@/lib/examData";

// The Portugal IMT driving theory (category B) bank: English base, European Portuguese (pt-PT)
// translation. Imported for its side effect by this exam's app pages only, so no other exam's
// pages bundle it.
registerExamBanks({ ptimt: ptimtQuestions as Question[] }, { ptimt: { pt: ptimtQuestionsPt as Question[] } });
