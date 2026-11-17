import { Question } from "@/types";
import cabcguardQuestions from "@/data/bc-security-worker-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The BC Basic Security Training (security guard) bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ cabcguard: cabcguardQuestions as Question[] });
