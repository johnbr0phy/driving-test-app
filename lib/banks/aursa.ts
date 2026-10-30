import { Question } from "@/types";
import aursaQuestions from "@/data/au-rsa-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Australian RSA (SITHFAB021) bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ aursa: aursaQuestions as Question[] });
