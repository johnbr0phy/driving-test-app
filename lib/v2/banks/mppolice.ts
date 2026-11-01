import { registerBank, plainBank } from "../bank";
import bank from "@/data/v2/mppolice/questions.json";

registerBank("mppolice", plainBank([bank]));
