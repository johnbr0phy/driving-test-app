import { registerBank, plainBank } from "../bank";
import bank from "@/data/v2/apcalcab/questions.json";

registerBank("apcalcab", plainBank([bank]));
