import { registerBank, plainBank } from "../bank";
import bank from "@/data/v2/jambmath/questions.json";

registerBank("jambmath", plainBank([bank]));
