import { Question } from "@/types";
import lifeguardQuestions from "@/data/lifeguard-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The lifeguard bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ lifeguard: lifeguardQuestions as Question[] });
