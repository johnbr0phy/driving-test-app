import { Question } from "@/types";
import dejagdQuestions from "@/data/de-jaegerpruefung-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The German hunting licence exam bank (Jägerprüfung, written part, Bavarian format), written in
// German. Imported for its side effect by this exam's app pages only, so no other exam's pages
// bundle it.
registerExamBanks({ dejagd: dejagdQuestions as Question[] });
