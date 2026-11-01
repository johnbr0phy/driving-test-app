import { registerBank, plainBank } from "../bank";
import bank from "@/data/v2/jambchem/questions.json";

// Plain array: JAMB Chemistry has no shared passages.
registerBank("jambchem", plainBank([bank]));
