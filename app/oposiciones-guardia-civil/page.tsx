import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/oposiciones-guardia-civil/dashboard");
}
