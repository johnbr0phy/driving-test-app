import { registerBank, plainBank } from "../bank";
import bank from "@/data/v2/cism/questions.json";

registerBank("cism", plainBank([bank]));
