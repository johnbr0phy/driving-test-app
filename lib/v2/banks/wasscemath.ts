import { registerBank, plainBank } from "../bank";
import bank from "@/data/v2/wasscemath/questions.json";

registerBank("wasscemath", plainBank([bank]));
