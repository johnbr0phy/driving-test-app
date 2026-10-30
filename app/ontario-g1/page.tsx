import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/ontario-g1/dashboard");
}
