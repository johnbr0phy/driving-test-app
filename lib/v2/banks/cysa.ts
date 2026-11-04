import { registerBank, plainBank } from "../bank";
import bank from "@/data/v2/cysa/questions.json";

registerBank("cysa", plainBank([bank]));
