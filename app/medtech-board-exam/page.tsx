import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/medtech-board-exam/dashboard");
}
