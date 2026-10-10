import { registerBank, plainBank } from "../bank";
import accuplacerBank from "@/data/v2/accuplacer/questions.json";

registerBank("accuplacer", plainBank([accuplacerBank]));
