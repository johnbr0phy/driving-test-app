import { registerBank, plainBank } from "../bank";
import bank from "@/data/v2/kcet/questions.json";

// Plain array: KCET PCM has no shared passages.
registerBank("kcet", plainBank([bank]));
