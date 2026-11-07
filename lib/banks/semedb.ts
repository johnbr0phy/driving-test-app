import { Question } from "@/types";
import semedbQuestions from "@/data/sweden-citizenship-test-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Swedish citizenship test bank (medborgarskapsprovet i samhällskunskap), written in Swedish.
// Imported for its side effect by this exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ semedb: semedbQuestions as Question[] });
