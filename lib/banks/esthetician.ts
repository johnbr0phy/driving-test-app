import { Question } from "@/types";
import estheticianQuestions from "@/data/esthetician-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The NIC National Esthetics Theory Examination practice bank. Imported for its side effect by
// this exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ esthetician: estheticianQuestions as Question[] });
