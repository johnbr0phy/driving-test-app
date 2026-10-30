import { registerBank, plainBank } from "../bank";
import bank from "@/data/v2/rrbntpc/questions.json";

registerBank("rrbntpc", plainBank([bank]));
