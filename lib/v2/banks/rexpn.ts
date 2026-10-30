import { registerBank, plainBank } from "../bank";
import bank from "@/data/v2/rexpn/questions.json";

// Plain array: the REx-PN has no shared case-study stimuli.
registerBank("rexpn", plainBank([bank]));
