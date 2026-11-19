import { registerBank, plainBank } from "../bank";
import bank from "@/data/v2/istqb/questions.json";

registerBank("istqb", plainBank([bank]));
