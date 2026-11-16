import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/switzerland-driving-theory/dashboard");
}
