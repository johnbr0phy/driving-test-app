import { Question } from "@/types";
import phrQuestions from "@/data/phr-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The HRCI PHR bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ phr: phrQuestions as Question[] });
