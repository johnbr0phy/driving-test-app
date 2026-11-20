import { Question } from "@/types";
import hamextraQuestions from "@/data/ham-extra-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The FCC Amateur Extra (Element 4) bank: the official NCVEC 2024-2028 pool. Imported for its
// side effect by this exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ hamextra: hamextraQuestions as Question[] });
