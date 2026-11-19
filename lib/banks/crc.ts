import { Question } from "@/types";
import crcQuestions from "@/data/crc-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The AAPC CRC bank. Imported for its side effect by this exam's
// app pages only, so no other exam's pages bundle it.
registerExamBanks({ crc: crcQuestions as Question[] });
