import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/finland-driving-theory/dashboard");
}
