import { Question } from "@/types";
import aafcsQuestions from "@/data/aafcs-hnfs-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The AAFCS Hospitality, Nutrition, and Food Science (HNFS) bank. Imported for its side effect by
// this exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ aafcs: aafcsQuestions as Question[] });
