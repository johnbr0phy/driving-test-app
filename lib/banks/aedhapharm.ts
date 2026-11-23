import { Question } from "@/types";
import aedhapharmQuestions from "@/data/gulf-pharmacist-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Gulf pharmacist licensing exam bank (DHA, DOH, MOHAP, SCFHS SPLE, Qatar DHP and others).
// Imported for its side effect by this exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ aedhapharm: aedhapharmQuestions as Question[] });
