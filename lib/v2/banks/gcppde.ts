import { registerBank, plainBank } from "../bank";
import bank from "@/data/v2/gcppde/questions.json";

registerBank("gcppde", plainBank([bank]));
