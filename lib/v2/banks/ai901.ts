import { registerBank, plainBank } from "../bank";
import bank from "@/data/v2/ai901/questions.json";

registerBank("ai901", plainBank([bank]));
