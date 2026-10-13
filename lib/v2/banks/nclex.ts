import { registerBank, plainBank } from "../bank";
import nclexBank from "@/data/v2/nclex/questions.json";

registerBank("nclex", plainBank([nclexBank]));
