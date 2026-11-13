import { registerBank, plainBank } from "../bank";
import bank from "@/data/v2/tgsi/questions.json";

registerBank("tgsi", plainBank([bank]));
