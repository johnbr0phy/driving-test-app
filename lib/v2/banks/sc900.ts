import { registerBank, plainBank } from "../bank";
import bank from "@/data/v2/sc900/questions.json";

registerBank("sc900", plainBank([bank]));
