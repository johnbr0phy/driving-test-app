import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/pl-900/dashboard");
}
