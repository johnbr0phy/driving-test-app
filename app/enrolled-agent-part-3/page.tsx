import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/enrolled-agent-part-3/dashboard");
}
