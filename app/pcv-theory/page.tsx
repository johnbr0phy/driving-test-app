import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/pcv-theory/dashboard");
}
