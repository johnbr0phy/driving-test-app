import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/belgium-motorcycle-theory/dashboard");
}
