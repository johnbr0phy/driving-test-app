import { Question } from "@/types";
import rotaxiQuestions from "@/data/romania-taxi-attestation-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Romania ARR taxi and rental driver attestation bank. Imported for its side effect by this
// exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ rotaxi: rotaxiQuestions as Question[] });
