import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/netherlands-driving-theory/dashboard");
}
