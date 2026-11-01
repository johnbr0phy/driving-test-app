import { registerBank, plainBank } from "../bank";
import bank from "@/data/v2/rrbalp/questions.json";

registerBank("rrbalp", plainBank([bank]));
