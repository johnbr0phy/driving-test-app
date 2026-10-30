import { Question } from "@/types";
import barberQuestions from "@/data/barber-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The barber theory bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ barber: barberQuestions as Question[] });
