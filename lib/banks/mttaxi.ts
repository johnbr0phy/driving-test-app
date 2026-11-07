import { Question } from "@/types";
import mttaxiQuestions from "@/data/malta-taxi-driver-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Malta taxi driver theory test bank. Imported for its side effect by this exam's app pages
// only, so no other exam's pages bundle it.
registerExamBanks({ mttaxi: mttaxiQuestions as Question[] });
