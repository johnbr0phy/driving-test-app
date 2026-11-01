import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/greece-driving-theory/dashboard");
}
