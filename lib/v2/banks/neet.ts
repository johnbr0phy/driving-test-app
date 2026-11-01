import { registerBank, plainBank } from "../bank";
import bank from "@/data/v2/neet/questions.json";

registerBank("neet", plainBank([bank]));
