import { Question } from "@/types";
import arrtctQuestions from "@/data/arrt-ct-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The ARRT Computed Tomography bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ arrtct: arrtctQuestions as Question[] });
