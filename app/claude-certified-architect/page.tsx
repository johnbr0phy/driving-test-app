import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/claude-certified-architect/dashboard");
}
