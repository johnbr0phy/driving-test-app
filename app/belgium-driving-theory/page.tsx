import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/belgium-driving-theory/dashboard");
}
