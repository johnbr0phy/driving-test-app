import { registerBank, plainBank } from "../bank";
import bank from "@/data/v2/pmiacp/questions.json";

registerBank("pmiacp", plainBank([bank]));
