import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/sweden-driving-theory/dashboard");
}
