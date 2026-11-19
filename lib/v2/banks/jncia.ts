import { registerBank, plainBank } from "../bank";
import bank from "@/data/v2/jncia/questions.json";

registerBank("jncia", plainBank([bank]));
