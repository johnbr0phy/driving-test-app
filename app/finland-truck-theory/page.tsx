import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/finland-truck-theory/dashboard");
}
