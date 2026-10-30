import { Question } from "@/types";
import ukcareQuestions from "@/data/uk-care-certificate-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Care Certificate bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ ukcare: ukcareQuestions as Question[] });
