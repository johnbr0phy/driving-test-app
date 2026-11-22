import { Question } from "@/types";
import plaplikQuestions from "@/data/pl-aplikacje-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Polish entrance exam bank for the advocate and legal adviser apprenticeships (egzamin
// wstępny na aplikację adwokacką i radcowską), written in Polish. Imported for its side effect
// by this exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ plaplik: plaplikQuestions as Question[] });
