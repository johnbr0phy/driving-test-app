import { Question } from "@/types";
import afpsatQuestions from "@/data/afpsat-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The AFPSAT (AFP Service Aptitude Test) bank. Imported for its side effect by this exam's app
// pages only, so no other exam's pages bundle it.
registerExamBanks({ afpsat: afpsatQuestions as Question[] });
