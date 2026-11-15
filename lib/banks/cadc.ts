import { Question } from "@/types";
import cadcQuestions from "@/data/adc-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The IC&RC ADC (Alcohol and Drug Counselor) bank. Imported for its side effect by this exam's
// app pages only, so no other exam's pages bundle it.
registerExamBanks({ cadc: cadcQuestions as Question[] });
