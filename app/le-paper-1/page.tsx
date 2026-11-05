import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/le-paper-1/dashboard");
}
