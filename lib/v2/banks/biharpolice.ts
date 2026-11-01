import { registerBank, plainBank } from "../bank";
import bank from "@/data/v2/biharpolice/questions.json";

registerBank("biharpolice", plainBank([bank]));
