import { registerBank, plainBank } from "../bank";
import bank from "@/data/v2/apcsp/questions.json";
registerBank("apcsp", plainBank([bank]));
