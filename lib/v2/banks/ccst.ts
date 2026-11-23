import { registerBank, plainBank } from "../bank";
import bank from "@/data/v2/ccst/questions.json";

registerBank("ccst", plainBank([bank]));
