import { Question } from "@/types";
import nzsecurityQuestions from "@/data/nz-security-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The NZ security guard (PSPLA certificate of approval) bank. Imported for its side effect by this
// exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ nzsecurity: nzsecurityQuestions as Question[] });
