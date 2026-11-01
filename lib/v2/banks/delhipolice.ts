import { registerBank, plainBank } from "../bank";
import bank from "@/data/v2/delhipolice/questions.json";

registerBank("delhipolice", plainBank([bank]));
