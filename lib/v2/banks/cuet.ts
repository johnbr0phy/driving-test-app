import { registerBank, plainBank } from "../bank";
import bank from "@/data/v2/cuet/questions.json";

registerBank("cuet", plainBank([bank]));
