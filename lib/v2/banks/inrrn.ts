import { registerBank, plainBank } from "../bank";
import bank from "@/data/v2/inrrn/questions.json";

registerBank("inrrn", plainBank([bank]));
