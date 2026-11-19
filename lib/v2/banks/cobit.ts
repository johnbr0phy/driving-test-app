import { registerBank, plainBank } from "../bank";
import bank from "@/data/v2/cobit/questions.json";

registerBank("cobit", plainBank([bank]));
