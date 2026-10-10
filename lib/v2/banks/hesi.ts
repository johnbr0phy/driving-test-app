import { registerBank, plainBank } from "../bank";
import hesiBank from "@/data/v2/hesi/questions.json";

registerBank("hesi", plainBank([hesiBank]));
