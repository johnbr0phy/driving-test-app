import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/greece-motorcycle-theory/dashboard");
}
