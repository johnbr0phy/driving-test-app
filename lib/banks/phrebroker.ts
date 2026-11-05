import { Question } from "@/types";
import phrebrokerQuestions from "@/data/philippines-re-broker-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The Philippine Real Estate Broker board exam bank. Imported for its side effect by this exam's
// app pages only, so no other exam's pages bundle it.
registerExamBanks({ phrebroker: phrebrokerQuestions as Question[] });
