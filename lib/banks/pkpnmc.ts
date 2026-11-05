import { Question } from "@/types";
import pkpnmcQuestions from "@/data/pnmc-licensing-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The PNMC nursing licensing exam bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ pkpnmc: pkpnmcQuestions as Question[] });
