import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/denmark-truck-theory/dashboard");
}
