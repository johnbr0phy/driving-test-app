import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/malta-private-guard/dashboard");
}
