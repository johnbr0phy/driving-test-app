import { registerBank, plainBank } from "../bank";
import asvabBank from "@/data/v2/asvab/questions.json";

registerBank("asvab", plainBank([asvabBank]));
