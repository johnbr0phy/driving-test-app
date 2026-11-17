import { registerBank, plainBank } from "../bank";
import bank from "@/data/v2/isc2cc/questions.json";

registerBank("isc2cc", plainBank([bank]));
