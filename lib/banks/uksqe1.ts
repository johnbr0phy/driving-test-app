import { Question } from "@/types";
import uksqe1Questions from "@/data/uk-sqe1-questions.json";
import { registerExamBanks } from "@/lib/examData";

// The SRA SQE1 (FLK1 and FLK2) bank. Imported for its side effect by this exam's app pages only,
// so no other exam's pages bundle it.
registerExamBanks({ uksqe1: uksqe1Questions as Question[] });
