import { registerBank, plainBank } from "../bank";
import bank from "@/data/v2/uppolice/questions.json";

registerBank("uppolice", plainBank([bank]));
