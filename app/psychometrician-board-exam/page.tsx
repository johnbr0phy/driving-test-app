import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/psychometrician-board-exam/dashboard");
}
