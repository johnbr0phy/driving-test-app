import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/mblex/dashboard");
}
