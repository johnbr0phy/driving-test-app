import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/romania-driving-theory/dashboard");
}
