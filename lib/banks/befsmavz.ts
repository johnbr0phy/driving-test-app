import { Question } from "@/types";
import befsmavzQuestions from "@/data/be-fsma-verzekeringen-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Belgian FSMA insurance distribution exam bank (verzekeringsdistributie), written in Dutch.
// Imported for its side effect by this exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ befsmavz: befsmavzQuestions as Question[] });
