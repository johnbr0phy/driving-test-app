import { registerBank, plainBank } from "../bank";
import bank from "@/data/v2/pl900/questions.json";

registerBank("pl900", plainBank([bank]));
