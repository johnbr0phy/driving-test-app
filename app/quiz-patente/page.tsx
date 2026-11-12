import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/quiz-patente/dashboard");
}
