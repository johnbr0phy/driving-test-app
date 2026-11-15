import { registerBank, withStimuli } from "../bank";
import afoqtBank from "@/data/v2/afoqt/questions.json";

// Built by tools/next100/afoqt/build.py from tools/next100/afoqt/*.py: object
// form { stimuli, questions } so reading passages and Table Reading grids are
// shared by several items.
registerBank("afoqt", withStimuli([afoqtBank] as Parameters<typeof withStimuli>[0]));
