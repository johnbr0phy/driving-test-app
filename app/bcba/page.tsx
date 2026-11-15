import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/bcba/dashboard");
}
