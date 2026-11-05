import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/midwife-board-exam/dashboard");
}
