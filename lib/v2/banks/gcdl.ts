import { registerBank, plainBank } from "../bank";
import bank from "@/data/v2/gcdl/questions.json";

registerBank("gcdl", plainBank([bank]));
