import { registerBank, plainBank } from "../bank";
import bank from "@/data/v2/pspo/questions.json";

registerBank("pspo", plainBank([bank]));
