import { Question } from "@/types";
import ukaplhQuestions from "@/data/uk-personal-licence-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Award for Personal Licence Holders (England and Wales) bank. Imported for its side effect
// by this exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ ukaplh: ukaplhQuestions as Question[] });
