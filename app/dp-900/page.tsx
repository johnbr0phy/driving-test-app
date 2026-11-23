import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/dp-900/dashboard");
}
