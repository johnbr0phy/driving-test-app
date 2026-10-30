import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/ireland-driver-theory/dashboard");
}
