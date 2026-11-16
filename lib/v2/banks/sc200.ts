import { registerBank, plainBank } from "../bank";
import bank from "@/data/v2/sc200/questions.json";

registerBank("sc200", plainBank([bank]));
