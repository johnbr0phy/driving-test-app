import { registerBank, plainBank } from "../bank";
import bank from "@/data/v2/faaifr/questions.json";

registerBank("faaifr", plainBank([bank]));
