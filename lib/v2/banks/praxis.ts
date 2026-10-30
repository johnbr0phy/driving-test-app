import { registerBank, withStimuli } from "../bank";
import praxisBank from "@/data/v2/praxis/questions.json";

// Built by tools/praxis/build.py: object form { stimuli, questions } so the
// reading passages and revision drafts are shared by several items.
registerBank("praxis", withStimuli([praxisBank] as Parameters<typeof withStimuli>[0]));
