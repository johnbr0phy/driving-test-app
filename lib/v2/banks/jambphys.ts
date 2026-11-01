import { registerBank, plainBank } from "../bank";
import bank from "@/data/v2/jambphys/questions.json";

// Plain array: JAMB Physics has no shared passages or tables.
registerBank("jambphys", plainBank([bank]));
