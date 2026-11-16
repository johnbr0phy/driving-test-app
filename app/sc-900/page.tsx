import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/sc-900/dashboard");
}
