import { Question } from "@/types";
import rodrpcivQuestions from "@/data/romania-drpciv-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Romania DRPCIV (category B) driving theory bank. Imported for its side effect by this exam's
// app pages only, so no other exam's pages bundle it.
registerExamBanks({ rodrpciv: rodrpcivQuestions as Question[] });
