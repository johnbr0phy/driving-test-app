import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/aat-level-2/dashboard");
}
