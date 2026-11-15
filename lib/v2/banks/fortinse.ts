import { registerBank, plainBank } from "../bank";
import bank from "@/data/v2/fortinse/questions.json";

registerBank("fortinse", plainBank([bank]));
