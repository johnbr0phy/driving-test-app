import { registerBank, withStimuli } from "../bank";
import sscmtsBank from "@/data/v2/sscmts/questions.json";

// Object form: two cloze passages and two reading passages plus questions.
registerBank("sscmts", withStimuli([sscmtsBank] as Parameters<typeof withStimuli>[0]));
