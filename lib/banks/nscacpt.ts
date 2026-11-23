import { Question } from "@/types";
import nscacptQuestions from "@/data/nsca-cpt-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The NSCA-CPT bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ nscacpt: nscacptQuestions as Question[] });
