import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/australian-citizenship/dashboard");
}
