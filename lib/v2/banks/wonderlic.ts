import { registerBank, plainBank } from "../bank";
import bank from "@/data/v2/wonderlic/questions.json";

registerBank("wonderlic", plainBank([bank]));
