import { Question } from "@/types";
import aertaQuestions from "@/data/uae-rta-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The UAE (RTA Dubai) driving theory bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ aerta: aertaQuestions as Question[] });
