import { registerBank, plainBank } from "../bank";
import bank from "@/data/v2/phcse/questions.json";

registerBank("phcse", plainBank([bank]));
