import { registerBank, plainBank } from "../bank";
import bank from "@/data/v2/ccat/questions.json";

registerBank("ccat", plainBank([bank]));
