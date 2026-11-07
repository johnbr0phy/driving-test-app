import { Question } from "@/types";
import deheilprQuestions from "@/data/de-heilpraktiker-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The German Heilpraktiker exam bank (schriftliche Überprüfung), written in German. Imported for
// its side effect by this exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ deheilpr: deheilprQuestions as Question[] });
