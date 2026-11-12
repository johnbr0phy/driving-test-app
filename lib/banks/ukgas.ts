import { Question } from "@/types";
import ukgasQuestions from "@/data/uk-gas-safe-acs-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Gas Safe ACS bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ ukgas: ukgasQuestions as Question[] });
