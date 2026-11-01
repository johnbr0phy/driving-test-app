import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/malta-driving-theory/dashboard");
}
