import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/portugal-driving-theory/dashboard");
}
