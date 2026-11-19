import { registerBank, plainBank } from "../bank";
import "@/lib/v2/ui/it";
import bank from "@/data/v2/itcils/questions.json";

// Italian bank; also registers the Italian v2 interface strings.
registerBank("itcils", plainBank([bank]));
