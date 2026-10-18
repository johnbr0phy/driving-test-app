import { Question } from "@/types";
import securityQuestions from "@/data/security-guard-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The security bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ security: securityQuestions as Question[] });
