import { Question } from "@/types";
import hamgeneralQuestions from "@/data/ham-general-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The FCC General class (Element 3) bank, the official NCVEC 2023-2027 pool. Imported for its side effect by this
// exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ hamgeneral: hamgeneralQuestions as Question[] });
