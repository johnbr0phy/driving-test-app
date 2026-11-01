import { registerBank, plainBank } from "../bank";
import bank from "@/data/v2/rajpolice/questions.json";

registerBank("rajpolice", plainBank([bank]));
