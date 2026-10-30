import { registerBank, plainBank } from "../bank";
import bank from "@/data/v2/ccna/questions.json";

registerBank("ccna", plainBank([bank]));
