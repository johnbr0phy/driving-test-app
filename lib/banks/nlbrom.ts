import { Question } from "@/types";
import nlbromQuestions from "@/data/nl-bromfiets-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Dutch moped theory exam bank (CBR theorie-examen bromfiets, rijbewijs AM), written in
// Dutch. Imported for its side effect by this exam's app pages only, so no other exam's pages
// bundle it.
registerExamBanks({ nlbrom: nlbromQuestions as Question[] });
