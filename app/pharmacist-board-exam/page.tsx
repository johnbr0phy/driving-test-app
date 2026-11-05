import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/pharmacist-board-exam/dashboard");
}
