import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/hsc-maths-standard/dashboard");
}
