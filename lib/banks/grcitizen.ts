import { Question } from "@/types";
import grcitizenQuestions from "@/data/gr-citizenship-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Greek naturalisation knowledge test bank (Π.Ε.Γ.Π., thematic units), written in Greek.
// Imported for its side effect by this exam's app pages only, so no other exam's pages bundle it.
registerExamBanks({ grcitizen: grcitizenQuestions as Question[] });
