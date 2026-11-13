import { registerBank, withStimuli } from "../bank";
import mapgrowthBank from "@/data/v2/mapgrowth/questions.json";

// Built by tools/next100/mapgrowth/build.py from tools/next100/mapgrowth/*.py:
// object form { stimuli, questions } so each reading passage is shared by its questions.
registerBank("mapgrowth", withStimuli([mapgrowthBank] as Parameters<typeof withStimuli>[0]));
