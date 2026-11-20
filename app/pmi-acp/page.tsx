import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/pmi-acp/dashboard");
}
