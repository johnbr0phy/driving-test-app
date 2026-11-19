import { registerBank, plainBank } from "../bank";
import "@/lib/v2/ui/it";
import bank from "@/data/v2/ita2/questions.json";

// Italian bank; also registers the Italian v2 interface strings.
registerBank("ita2", plainBank([bank]));
