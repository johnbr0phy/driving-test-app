import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/spain-driving-theory/dashboard");
}
