import { registerBank, plainBank } from "../bank";
import bank from "@/data/v2/gcsescience/questions.json";

// Built by tools/gcsescience/build.py from the six domain source files in
// tools/gcsescience/ (biology, chemistry and physics, paper 1 and paper 2
// topics each). A plain array: no shared stimuli.
registerBank("gcsescience", plainBank([bank]));
