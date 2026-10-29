import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/lgv-theory/dashboard");
}
