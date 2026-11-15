import { Question } from "@/types";
import aseQuestions from "@/data/ase-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The ASE Automobile and Light Truck A1-A8 bank (eight A-test pools of 40). Imported for its side
// effect by this exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ ase: aseQuestions as Question[] });
