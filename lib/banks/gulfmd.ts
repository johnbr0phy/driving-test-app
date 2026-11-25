import { Question } from "@/types";
import gulfmdQuestions from "@/data/gulf-doctor-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Gulf doctor licensing exam bank (SCFHS SMLE, DHA, DOH, MOHAP, Qatar DHP and others).
// Imported for its side effect by this exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ gulfmd: gulfmdQuestions as Question[] });
