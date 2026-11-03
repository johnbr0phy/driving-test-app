import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/cfa-level-1/dashboard");
}
