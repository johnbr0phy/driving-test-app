import { registerBank, plainBank } from "../bank";
import bank from "@/data/v2/itil/questions.json";

registerBank("itil", plainBank([bank]));
