import { Question } from "@/types";
import arrtmriQuestions from "@/data/arrt-mri-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The ARRT Magnetic Resonance Imaging bank. Imported for its side effect by this exam's app pages
// only, so no other exam's pages bundle it.
registerExamBanks({ arrtmri: arrtmriQuestions as Question[] });
