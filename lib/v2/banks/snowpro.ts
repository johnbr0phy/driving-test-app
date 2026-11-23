import { registerBank, plainBank } from "../bank";
import bank from "@/data/v2/snowpro/questions.json";

registerBank("snowpro", plainBank([bank]));
