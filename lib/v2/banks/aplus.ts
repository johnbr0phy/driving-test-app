import { registerBank, plainBank } from "../bank";
import bank from "@/data/v2/aplus/questions.json";

registerBank("aplus", plainBank([bank]));
