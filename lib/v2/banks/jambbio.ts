import { registerBank, plainBank } from "../bank";
import bank from "@/data/v2/jambbio/questions.json";

registerBank("jambbio", plainBank([bank]));
