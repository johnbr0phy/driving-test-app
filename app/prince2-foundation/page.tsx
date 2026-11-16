import { permanentRedirect } from "next/navigation";

export default function RootRedirect() {
  permanentRedirect("/prince2-foundation/dashboard");
}
