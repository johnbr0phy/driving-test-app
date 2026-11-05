import { Question } from "@/types";
import iepsaQuestions from "@/data/ie-psa-security-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The PSA security guard (QQI Level 4 Security Guarding Skills, Ireland) bank. Imported for its
// side effect by this exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ iepsa: iepsaQuestions as Question[] });
