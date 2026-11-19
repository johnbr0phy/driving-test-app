import { Question } from "@/types";
import ctecQuestions from "@/data/ctec-tax-preparer-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The California CTEC tax preparer bank. Imported for its side effect by this exam's app pages
// only, so no other exam's pages bundle it.
registerExamBanks({ ctec: ctecQuestions as Question[] });
