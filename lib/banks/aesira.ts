import { Question } from "@/types";
import aesiraQuestions from "@/data/sira-security-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Dubai SIRA security guard bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ aesira: aesiraQuestions as Question[] });
