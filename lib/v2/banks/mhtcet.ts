import { registerBank, plainBank } from "../bank";
import bank from "@/data/v2/mhtcet/questions.json";

// Plain array: MHT-CET PCM has no shared passages.
registerBank("mhtcet", plainBank([bank]));
