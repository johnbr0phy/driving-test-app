import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/safe-pass/dashboard");
}
