import { registerBank, withStimuli } from "../bank";
import lsatBank from "@/data/v2/lsat/questions.json";

// Object form: the Reading Comprehension passages plus questions.
registerBank("lsat", withStimuli([lsatBank] as Parameters<typeof withStimuli>[0]));
