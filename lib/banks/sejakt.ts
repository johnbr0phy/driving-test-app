import { Question } from "@/types";
import sejaktQuestions from "@/data/sweden-hunting-theory-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Swedish hunting licence theory test bank (jägarexamen, teoriprov), written in Swedish.
// Imported for its side effect by this exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ sejakt: sejaktQuestions as Question[] });
